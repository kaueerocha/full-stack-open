import { useState } from 'react'

const Anecdotes = ( props ) => {
  return (
    <div>
      <h1> {props.text} </h1>
      <p> {props.anecdotes} </p>
      <p> has {props.numVotes} votes </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const mostVoted = Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0];

  const handleRandomNumber = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  const handleVote = () => {
    const copy = {...votes};
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      <Anecdotes numVotes={votes[selected]} anecdotes={anecdotes[selected]} text="Anecdote of the day"/>
      <button onClick={handleVote}>
        Vote
      </button>
      <button onClick={handleRandomNumber}>
        Next anecdote
      </button>
      <Anecdotes numVotes={votes[mostVoted]} anecdotes={anecdotes[mostVoted]} text="Anecdote with most votes"/>
    </div>


  )
}

export default App