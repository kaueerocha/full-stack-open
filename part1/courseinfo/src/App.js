export const Header = ( props ) => {
  return (
    <h1>{props.course}</h1>
  )
}

export const Content = ( props ) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  )
}

export const Total = ( props ) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>{total}</p>
  )
}

const App = () => {
  const course = 'Desenvolvimento de aplicação Half Stack'
  const parts = [
    { name: 'Fundamentos da biblioteca React', exercises: 10 },
    { name: 'Usando props para passar dados', exercises: 7 },
    { name: 'Estado de um componente', exercises: 14 },
  ];
  
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}
export default App
