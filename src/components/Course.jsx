const Header = ({name}) => <h2>{name}</h2>;
const Part = ({part}) =>(
    <p>{part.name} {part.exercises}</p>
)
const Content =({parts}) => (
    <div>
        {parts.map(part =>
            <Part key={part.id} part={part}/>
        )}
    </div>
)
const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <strong>Total of {total} exercises</strong>
  }
const Courseno = ({course}) => (
    <div>
        <Header name = {course.name}/>
        <Content parts={course.parts}/>
        <Total parts= {course.parts}/>
    </div>
)

const Course = ({courses}) =>(
    <div>
        {courses.map(c =>
            <Courseno key={c.id} course={c}/>
        )}
    </div>
)

export default Course;