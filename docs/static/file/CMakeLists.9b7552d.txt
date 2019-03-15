cmake_minimum_required(VERSION 3.4.1)

# build native_app_glue as a static lib
set(APP_GLUE_DIR ${ANDROID_NDK}/sources/android/native_app_glue)
include_directories(${APP_GLUE_DIR})
add_library( app-glue STATIC ${APP_GLUE_DIR}/android_native_app_glue.c)

set(VULKAN_WRAPPER_DIR ${ANDROID_NDK}/sources/android/vulkan_wrapper)
include_directories(${VULKAN_WRAPPER_DIR})
add_library( vulkan-wrapper STATIC ${VULKAN_WRAPPER_DIR}/vulkan_wrapper.cpp)

add_library(vulkan-test SHARED
            native-lib.cpp)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Werror -std=c++11 \
                     -DVK_USE_PLATFORM_ANDROID_KHR")
set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} -u ANativeActivity_onCreate")

target_link_libraries(vulkan-test app-glue vulkan-wrapper log android)