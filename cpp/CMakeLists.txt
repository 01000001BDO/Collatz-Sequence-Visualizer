cmake_minimum_required(VERSION 3.10)
project(SyracuseSequence)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
find_package(OpenGL REQUIRED)
find_package(GLUT REQUIRED)
add_executable(${PROJECT_NAME} 
    src/main.cpp
)
target_include_directories(${PROJECT_NAME} 
    PRIVATE 
        ${OPENGL_INCLUDE_DIRS}
        ${GLUT_INCLUDE_DIRS}
)
target_link_libraries(${PROJECT_NAME} 
    PRIVATE 
        ${OPENGL_LIBRARIES}
        ${GLUT_LIBRARIES}
)