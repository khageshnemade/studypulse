import ProtoTypes from "prop-types";
import CourseItemCard from "../Cards/CourseItemCard";
import { Link } from "react-router-dom";

function PopularCourse({ course, heading }) {
  return (
    <section className="popular-course-section">
      <div className="container">
        {heading && (
          <div className="row">
            <div className="col-md-8">
              <h2 className="sec-title">
                <span>Explore</span> Our Popular Services
              </h2>
            </div>
            {/* <div className="col-md-4">
              <a className="read-more" href="#">
                Browse Online Courses<i className="arrow_right"></i>
              </a>
            </div> */}
          </div>
        )}
        {course && (
          <div className="row">
            <div className="col-lg-12">
              <div className="course-wrapper">
                <CourseItemCard title="Conferences" link="single-course">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="74"
                    height="60"
                    viewBox="0 0 74 60"
                  >
                    <defs>
                      <pattern
                        id="pattern"
                        preserveAspectRatio="xMidYMid slice"
                        width="100%"
                        height="100%"
                        viewBox="0 0 74 60"
                      >
                        <image
                          width="74"
                          height="60"
                          xlinkHref="assets/images/home/desktop1-image.png"
                        />
                      </pattern>
                    </defs>
                    <path
                      id="desktop1"
                      className="cls-1"
                      style={{ fill: "url(#pattern)" }}
                      d="M0,0H74V60H0Z"
                    />
                  </svg>
                </CourseItemCard>
                <CourseItemCard
                  title="Final Exams"
                  link="single-course"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <image
                      id="data"
                      width="64"
                      height="64"
                      xlinkHref="assets/images/home/f1.png"
                    />
                  </svg>
                </CourseItemCard>
                <CourseItemCard
                  title="Online Tutor"
                  link="single-course"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="74"
                    height="70"
                    viewBox="0 0 74 70"
                  >
                    <image
                      id="proposal"
                      width="74"
                      height="70"
                      xlinkHref="assets/images/home/proposal-image.png"
                    />
                  </svg>
                </CourseItemCard>
                <CourseItemCard title="Study Materials" link="single-course">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="80"
                    height="67"
                    viewBox="0 0 80 67"
                  >
                    <image
                      id="chat"
                      width="80"
                      height="67"
                      xlinkHref="assets/images/home/f5.png"
                    />
                  </svg>
                </CourseItemCard>
                <CourseItemCard
                  title="Scholarships"
                  link="single-course"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="58"
                    height="73"
                    viewBox="0 0 58 73"
                  >
                    <image
                      id="mind"
                      width="58"
                      height="73"
                      xlinkHref="assets/images/home/f6.png"
                    />
                  </svg>
                </CourseItemCard>
              </div>
            </div>
          </div>
        )}
        <div className="row mt-120">
          <div className="col-lg-7 col-md-6">
            <div className="ab-thumb">
              <img src="assets/images/home/1.png" alt="" />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="ab-content">
              <h3>We Offer The Best Career</h3>
              <p className="mid-item">
                         
                <b> Industry Expert Instructors </b><br />
                Learn from industry experts who bring real-world experience to the classroom.
              </p>
              <p className="mid-item">
                <b> Up-to-Date Course Content
                </b><br />
                Stay current with our courses that are regularly updated to reflect industry trends and best practices.

              </p>
              <p className="mid-item">
                <b> Biggest Student Community
                </b><br />
                Join our vibrant student community and engage with peers from around the globe.
              </p>

              <Link className="bisylms-btn" to="/register">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

PopularCourse.propTypes = {
  course: ProtoTypes.bool,
  heading: ProtoTypes.bool,
};

export default PopularCourse;
