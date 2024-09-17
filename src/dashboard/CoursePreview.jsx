import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Replace with your Firebase config
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const CoursePreview = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course data
        const courseDoc = await getDoc(doc(firestore, 'courses', courseId));
        if (courseDoc.exists()) {
          const courseData = courseDoc.data();
          setCourse(courseData);

          // Set the first video as the default selected video
          if (courseData.chapters.length > 0 && courseData.chapters[0].videos.length > 0) {
            setSelectedVideo(courseData.chapters[0].videos[0]);
          }
        } else {
          console.log('No such course!');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const totalLectures = course.chapters.reduce((acc, chapter) => acc + chapter.videos.length, 0);
  const totalLength = course.chapters.reduce((acc, chapter) => {
    return acc + chapter.videos.reduce((vidAcc, video) => {
      const duration = parseInt(video.duration || 0, 10);
      return vidAcc + (isNaN(duration) ? 0 : duration);
    }, 0);
  }, 0);

  return (
    <div className="flex flex-row max-w-7xl mx-auto p-4 text-white bg-gray-900 space-x-6">
      {/* Left Column: Video and Course Information */}
      <div className="flex-1">
        {/* Video Section */}
        {selectedVideo ? (
          <div className="relative bg-black h-96 mb-4">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={selectedVideo.videoLink.replace("watch?v=", "embed/")}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="relative bg-black h-96 mb-4 flex items-center justify-center">
            <p className="text-white">No video available</p>
          </div>
        )}

        {/* Course Information */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{course.title || "Course Title"}</h1>
          <div className="flex items-center space-x-2 text-gray-400 mb-4">
            <span className="flex items-center text-yellow-400 font-semibold">{course.rating || "4.4"}</span>
            <span>({course.numRatings || "N/A"} ratings)</span>
            <span>{course.students || "N/A"} students</span>
            <span>{totalLength} minutes total length</span>
          </div>
          <div className="text-gray-400 text-sm">
            <p>Last updated {course.createdAt.toDate().toLocaleDateString() || "Date"}</p>
            <p>{course.language || "English"}, {course.subtitles || "English [Auto]"}</p>
          </div>
        </div>

        {/* Schedule Learning Time */}
        <div className="mb-6 p-4 bg-gray-800 rounded">
          <h2 className="text-lg font-semibold mb-2">Schedule learning time</h2>
          <p className="text-gray-400 mb-4">Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals. Set time aside to learn and get reminders using your learning scheduler.</p>
          <div className="flex space-x-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Get started</button>
            <button className="text-gray-400 hover:text-white">Dismiss</button>
          </div>
        </div>
      </div>

      {/* Right Column: Course Content */}
      <div className="w-1/3 bg-gray-800 rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Course content</h2>
        <div className="flex justify-between text-gray-400 mb-2">
          <div className="flex items-center">
            <span className="mr-4">{course.chapters.length} sections</span>
            <span>{totalLectures} lectures</span>
          </div>
          <span>{totalLength} minutes total length</span>
        </div>
        <div className="border-t border-gray-700 pt-4">
          {course.chapters.map((chapter, index) => (
            <details key={index} className="mb-4">
              <summary className="cursor-pointer font-medium text-lg mb-2">{chapter.title || `Section ${index + 1}`}</summary>
              <ul className="list-none space-y-2 pl-4">
                {chapter.videos.map((video, videoIndex) => (
                  <li
                    key={videoIndex}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />
                      <span>{video.title || `Video ${videoIndex + 1}`}</span>
                    </div>
                    <span>{video.duration ? `${video.duration} min` : 'N/A'}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
