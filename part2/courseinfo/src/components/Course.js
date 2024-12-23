const Content = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0);
  
  return (
    <div>
      {course.parts.map((part) => 
        <Part key={part.id} part={part}/>
      )}
      <strong>total of {sum} exercises</strong>
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content course={course}/>
        
    </div>
  )
}
  
export default Course