import {Navigate, useRoutes} from 'react-router-dom'
// layouts
import DashboardLayout from 'layouts/dashboard'
import LogoOnlyLayout from 'layouts/LogoOnlyLayout'
//
import Blog from 'screens/Blog'
import Categories from 'screens/Categories'
import DashboardApp from 'screens/DashboardApp'
import Login from 'screens/Login'
import NotFound from 'screens/Page404'
import Products from 'screens/Products'
import Roles from 'screens/Users/Roles'

import Groups from 'screens/Groups'
import AddGroup from 'screens/Groups/Add'
import ShowGroup from 'screens/Groups/ShowGroup'

import AddCategoty from 'screens/Categories/Add'
import EditCategoty from 'screens/Categories/EditCategoty'
import ShowCategoty from 'screens/Categories/ShowCategoty'
import EditRole from 'screens/Users/Roles/EditRole'

import Profile from 'screens/Profile'

import {useAuth} from 'context/auth-context'
import useRoles from 'hooks/useRoles'
import EditProfile from 'screens/Profile/Partials/EditProfile'
import CustomizedSteppers from 'screens/Stepper'
import Accounts from 'screens/Users/Accounts'
import AddAccount from 'screens/Users/Accounts/Add'
import EditAccount from 'screens/Users/Accounts/EditAccount'
import ShowAccount from 'screens/Users/Accounts/ShowAccount'

import Calendar from 'screens/Calendar'
import Courses from 'screens/Courses'

import BigBlueButton from 'screens/BigBlueButton'
import AddMeeting from 'screens/BigBlueButton/Add'
import CourseAssignments from 'screens/CourseAssignments'
import AddAssignment from 'screens/CourseAssignments/Add'
import EditAssignment from 'screens/CourseAssignments/Edit'
import ShowAssignment from 'screens/CourseAssignments/Show'
import ShowCourseAssignments from 'screens/CourseAssignments/ShowCourseAssignments'
import CourseQuizzes from 'screens/CourseQuizzes'
import AddQuiz from 'screens/CourseQuizzes/Add'
import EditQuiz from 'screens/CourseQuizzes/EditQuiz'
import ShowCourseQuizzes from 'screens/CourseQuizzes/ShowCourseQuizzes'
import ShowQuiz from 'screens/CourseQuizzes/ShowQuiz'
import ShowUserCourse from 'screens/Courses/Show'
import ShowUserLesson from 'screens/Courses/ShowUserLesson'
import ManageCourses from 'screens/ManageCourses'
import AddCourse from 'screens/ManageCourses/Add'
import EditCourse from 'screens/ManageCourses/EditCourse'
import ShowLesson from 'screens/ManageCourses/Partials/Lessons/Show'
import ChooseModule from 'screens/ManageCourses/Partials/Lessons/Show/LessonModules/AddModule/ChooseModule'
import FileModule from 'screens/ManageCourses/Partials/Lessons/Show/LessonModules/AddModule/FileModule'
import UrlModule from 'screens/ManageCourses/Partials/Lessons/Show/LessonModules/AddModule/UrlModule'
import ShowCourse from 'screens/ManageCourses/ShowCourse'
import StdBigBlueButton from 'screens/StdBigBlueButton'
import StdCourseAssignments from 'screens/StdCourseAssignments'
import ShowStdAssignment from 'screens/StdCourseAssignments/Show'
import ShowStdCourseAssignments from 'screens/StdCourseAssignments/ShowCourseAssignments'
import StdCourseQuizzes from 'screens/StdCourseQuizzes'
import QuizInfo from 'screens/StdCourseQuizzes/QuizInfo'
import StartQuiz from 'screens/StdCourseQuizzes/StartQuiz'
import StdShowCourseQuizzes from 'screens/StdCourseQuizzes/StdShowCourseQuizzes'
import StudentGrades from 'screens/StudentGrades'
import ShowQuizStudentGrade from 'screens/StudentGrades/QuizStudentGrade'
import ShowGrades from 'screens/StudentGrades/QuizStudentGrade'
import FavCourses from 'screens/FavCourses'

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'login-stepper',
          element: (
            <PrivateAdminStepperRoute>
              <CustomizedSteppers />
            </PrivateAdminStepperRoute>
          ),
        },
        {
          path: 'app',
          element: (
            <PrivateRoute>
              <PrivateAdminRoute>
                <DashboardApp />
              </PrivateAdminRoute>
            </PrivateRoute>
          ),
        },
        {
          path: 'profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {path: 'profile/edit', element: <EditProfile />},

        {path: 'calendar', element: <Calendar />},

        {path: 'fav_courses', element: <FavCourses />},

        {path: 'courses', element: <Courses />},
        {path: 'courses/:id/show', element: <ShowUserCourse />},
        {
          path: 'courses/:id/show/lessons/:lessonId/show',
          element: <ShowUserLesson />,
        },

        {path: 'manage-courses', element: <ManageCourses />},
        {path: 'manage-courses/add', element: <AddCourse />},
        {path: 'manage-courses/:id/edit', element: <EditCourse />},
        {path: 'manage-courses/:id/show', element: <ShowCourse />},
        {
          path: 'manage-courses/:id/show/lessons/:lessonId/show',
          element: <ShowLesson />,
        },
        {
          path: 'manage-courses/:id/show/lessons/:lessonId/show/files',
          element: <FileModule />,
        },
        {
          path: 'manage-courses/:id/show/lessons/:lessonId/show/choose',
          element: <ChooseModule />,
        },
        {
          path: 'manage-courses/:id/show/lessons/:lessonId/show/url',
          element: <UrlModule />,
        },
        {
          path: 'categories',
          element: (
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          ),
        },
        {path: 'categories/add', element: <AddCategoty />},
        {path: 'categories/:id/edit', element: <EditCategoty />},
        {path: 'categories/:id/show', element: <ShowCategoty />},

        {
          path: 'groups',
          element: (
            <PrivateRoute>
              <Groups />
            </PrivateRoute>
          ),
        },
        {path: 'groups/add', element: <AddGroup />},
        // {path: 'groups/:id/edit', element: <EditGroup />},
        {path: 'groups/:id/show', element: <ShowGroup />},

        {path: 'std-bbb', element: <StdBigBlueButton />},

        {path: 'bbb', element: <BigBlueButton />},
        {path: 'bbb/add', element: <AddMeeting />},
        //Course Quizzes
        {path: 'grades', element: <StudentGrades />},
        {
          path: 'grades/:id/show',
          element: <ShowGrades />,
        },

        {path: 'course_quizzes', element: <CourseQuizzes />},
        {
          path: 'course_quizzes/:category_id/:id/show',
          element: <ShowCourseQuizzes />,
        },

        {path: 'course_quizzes/:course_id/add', element: <AddQuiz />},
        {
          path: 'course_quizzes/:course_id/edit/:quiz_id',
          element: <EditQuiz />,
        },
        {
          path: 'course_quizzes/:category_id/:course_id/show/:quiz_id/show',
          element: <ShowQuiz />,
        },
        //Course Assignments
        {path: 'course_assignments', element: <CourseAssignments />},
        {
          path: 'course_assignments/:category_id/:id/show',
          element: <ShowCourseAssignments />,
        },

        {path: 'course_assignments/:course_id/add', element: <AddAssignment />},
        {
          path: 'course_assignments/:course_id/edit/:assignment_id',
          element: <EditAssignment />,
        },
        {
          path: 'course_assignments/:category_id/:course_id/show/:assignment_id/show',
          element: <ShowAssignment />,
        },
        //std Course Assignments
        {path: 'std_course_assignments', element: <StdCourseAssignments />},
        {
          path: 'std_course_assignments/:id/show',
          element: <ShowStdCourseAssignments />,
        },
        {
          path: 'std_course_assignments/:course_id/show/:assignment_id/show',
          element: <ShowStdAssignment />,
        },
        // std course quizzes
        {path: 'std_course_quizzes', element: <StdCourseQuizzes />},
        {
          path: 'std_course_quizzes/:id/show',
          element: <StdShowCourseQuizzes />,
        },
        {
          path: 'std_course_quizzes/:course_id/show/:quiz_id/quiz-info',
          element: <QuizInfo />,
        },
        {
          path: 'std_course_quizzes/:course_id/show/:quiz_id/quiz-info/start-quiz',
          element: <StartQuiz />,
        },
        {
          path: 'users/roles',
          element: (
            <PrivateRoute>
              <Roles />
            </PrivateRoute>
          ),
        },
        {path: 'users/roles/:id/edit', element: <EditRole />},
        {
          path: 'users/accounts',
          element: (
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>
          ),
        },
        {path: 'users/accounts/add', element: <AddAccount />},
        {path: 'users/accounts/:id/show', element: <ShowAccount />},
        {path: 'users/accounts/:id/edit', element: <EditAccount />},

        {path: 'products', element: <Products />},
        {path: 'blog', element: <Blog />},
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        {path: '/', element: <Navigate to="/dashboard/app" />},
        {path: 'login', element: <Login />},
        {path: '404', element: <NotFound />},
        {path: '*', element: <Navigate to="/404" />},
      ],
    },
    {path: '*', element: <Navigate to="/404" replace />},
  ])
}

function PrivateRoute({children}) {
  const {user} = useAuth()

  return user.status === 0 || user.status === 1 ? (
    <Navigate to="/dashboard/login-stepper" />
  ) : (
    children
  )
}
function PrivateAdminRoute({children}) {
  const {checkIfRolesInUserRoles} = useRoles()

  return !checkIfRolesInUserRoles(['ROLE_ADMIN']) ? (
    <Navigate to="/dashboard/profile" />
  ) : (
    children
  )
}
function PrivateAdminStepperRoute({children}) {
  const {checkIfRolesInUserRoles} = useRoles()

  return checkIfRolesInUserRoles(['ROLE_ADMIN']) ? (
    <Navigate to="/dashboard/app" />
  ) : (
    children
  )
}
