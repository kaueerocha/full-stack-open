export const Header = ( props ) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

export const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

export const Content = (props) => {
  return (
    <div>
      {props.parts.parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export const Total = ( props ) => {
  const total = props.parts.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>{total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Desenvolvimento de aplicação Half Stack',
    parts: [
      {
        name: 'Fundamentos da biblioteca React',
        exercises: 10
      },
      {
        name: 'Usando props para passar dados',
        exercises: 7
      },
      {
        name: 'Estado de um componente',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course}/>
      <Total parts={course}/>
    </div>
  )
}
export default App
