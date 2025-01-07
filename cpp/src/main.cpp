#include <GL/glut.h>
#include <vector>
#include <cmath>
#include <iostream>
#include <algorithm>
#define _USE_MATH_DEFINES

std::vector<unsigned long long> sequence;
float progress = 0.0f;
bool journeyComplete = false;

struct Point3D {
    float x, y, z;
};

std::vector<Point3D> pathPoints;

void generateSequence(unsigned long long start) {
    sequence.clear();
    sequence.push_back(start);
    unsigned long long current = start;
    while (current != 1) {
        current = (current % 2 == 0) ? current / 2 : current * 3 + 1;
        sequence.push_back(current);
    }
    std::cout << "Start :  " << sequence.size() << " numbers\n";
    std::cout << "Init : " << start;
    for (size_t i = 1; i < sequence.size(); i++) {
        std::cout << " → " << sequence[i];
    }
    std::cout << "\n";
}

void generatePath() {
    pathPoints.clear();
    float maxVal = log(*std::max_element(sequence.begin(), sequence.end()));
    
    for (size_t i = 0; i < sequence.size(); i++) {
        Point3D point;
        float ratio = (float)i / sequence.size();
        point.x = (ratio * 8.0f) - 4.0f;
        point.y = (log(sequence[i]) / maxVal * 2.0f);
        float angle = ratio * M_PI * 3;
        float radius = 0.8f + point.y * 0.2f;
        point.z = sin(angle) * radius;
        pathPoints.push_back(point);
    }
}

Point3D getLookAheadPoint(float t) {
    int currentIndex = int(t * (pathPoints.size() - 1));
    int nextIndex = std::min(currentIndex + 1, (int)pathPoints.size() - 1);
    float blend = t * (pathPoints.size() - 1) - currentIndex;
    
    Point3D result;
    result.x = pathPoints[currentIndex].x * (1-blend) + pathPoints[nextIndex].x * blend;
    result.y = pathPoints[currentIndex].y * (1-blend) + pathPoints[nextIndex].y * blend;
    result.z = pathPoints[currentIndex].z * (1-blend) + pathPoints[nextIndex].z * blend;
    return result;
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glLoadIdentity();
    
    Point3D currentPos = getLookAheadPoint(progress);
    Point3D lookAhead = getLookAheadPoint(std::min(progress + 0.05f, 1.0f));
    
    gluLookAt(currentPos.x, currentPos.y + 0.2f, currentPos.z,
              lookAhead.x, lookAhead.y + 0.2f, lookAhead.z,
              0.0f, 1.0f, 0.0f);    glLineWidth(2.0f);
    glBegin(GL_LINE_STRIP);
    for (size_t i = 0; i < pathPoints.size(); i++) {
        glColor4f(1.0f, 1.0f, 1.0f, 0.2f);
        glVertex3f(pathPoints[i].x, pathPoints[i].y, pathPoints[i].z);
    }
    glEnd();
    glLineWidth(3.0f);
    glBegin(GL_LINE_STRIP);
    float startDraw = std::max(0.0f, progress - 0.1f);
    float endDraw = std::min(progress + 0.2f, 1.0f);
    
    for (float t = startDraw; t <= endDraw; t += 0.01f) {
        Point3D p = getLookAheadPoint(t);
        float brightness = 1.0f - fabs(t - progress) * 3.0f;
        brightness = std::max(0.0f, std::min(1.0f, brightness));
        glColor4f(1.0f, 1.0f, 1.0f, brightness);
        glVertex3f(p.x, p.y, p.z);
    }
    glEnd();
    glPointSize(8.0f);
    glBegin(GL_POINTS);
    for (size_t i = 0; i < pathPoints.size(); i++) {
        float t = (float)i / (pathPoints.size() - 1);
        if (t <= progress) {
            glColor4f(0.3f, 0.6f, 1.0f, 0.8f);  
        } else {
            glColor4f(0.3f, 0.6f, 1.0f, 0.3f);  
        }
        glVertex3f(pathPoints[i].x, pathPoints[i].y, pathPoints[i].z);
    }
    glEnd();
    
    glutSwapBuffers();
}

void update(int value) {
    if (!journeyComplete) {
        progress += 0.0005f;  
        
        int currentIndex = int(progress * (sequence.size() - 1));
        if (currentIndex < sequence.size()) {
            std::cout << "Passing: " << sequence[currentIndex] << "\n";
        }
        
        if (progress >= 1.0f) {
            journeyComplete = true;
            std::cout << "Journey complete!\n";
        }
        
        glutPostRedisplay();
        glutTimerFunc(16, update, 0);
    }
}

void init() {
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_POINT_SMOOTH);
    glEnable(GL_LINE_SMOOTH);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glClearColor(0.0f, 0.0f, 0.1f, 1.0f);
    
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(60.0f, 800.0f/600.0f, 0.1f, 100.0f);
    glMatrixMode(GL_MODELVIEW);
}

void keyboard(unsigned char key, int x, int y) {
    if (key == 27) exit(0);
}

int main(int argc, char** argv) {
    unsigned long long start = 27;
    if (argc > 1) start = std::stoull(argv[1]);
    
    generateSequence(start);
    generatePath();
    
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);
    glutInitWindowSize(800, 600);
    glutCreateWindow("Ye it's Syracuse Sequence hh ");
    init();
    
    glutDisplayFunc(display);
    glutKeyboardFunc(keyboard);
    glutTimerFunc(0, update, 0);
    
    glutMainLoop();
    return 0;
}