# Tutorial: Criando um Gerador de Senhas em React

Neste tutorial, vamos criar passo a passo um gerador de senhas aleatórias utilizando React, analisando a lógica matemática e o gerenciamento de estado.

## Passo 1: Configurando o Estado (State)

Primeiro, precisamos criar as variáveis de estado no nosso componente `App`. Usamos o hook `useState` do React para isso. Precisamos de um estado para armazenar a senha gerada e outro para o tamanho desejado da senha.

```javascript
import { useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState('') // Inicia vazio
```

- `password`: Armazena o texto da senha gerada.
- `length`: Armazena a quantidade de caracteres que a senha terá.

## Passo 2: A Lógica de Geração da Senha

Vamos criar a função `generatePassword`. Ela será executada sempre que o usuário clicar no botão.

```javascript
  const generatePassword = () => {
    // 1. Validação de segurança
    if (length < 6 || length > 120) {
      alert("O tamanho da senha deve estar entre 6 e 120 caracteres")
      return
    }

    const validLength = length
    
    // 2. Definir os caracteres permitidos
    const charset = "1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?"
    let newPassword = ""
    
    // 3. Sorteio aleatório dos caracteres
    for (let i = 0; i < validLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      newPassword += charset[randomIndex]
    }
    
    // 4. Atualizar o estado com a nova senha
    setPassword(newPassword)
  }
```

**Como funciona a lógica matemática:**
- `Math.random()`: Gera um número decimal aleatório entre 0 e 0.999...
- Multiplicamos esse valor pelo tamanho total de caracteres disponíveis (`charset.length`).
- `Math.floor()`: Arredonda o valor para baixo, garantindo que tenhamos um número inteiro perfeito para usar como posição (índice) no nosso texto base (`charset`).
- O laço `for` repete isso até a senha atingir o tamanho (`validLength`) estipulado.

## Passo 3: Criando a Interface do Usuário

Agora, dentro do `return()`, vamos criar os elementos visuais na tela.

```javascript
  return (
    <div className="app-container">
      <h1>Gerador de Senha</h1>
      
      {/* Campo de Entrada do Tamanho */}
      <div className="controls">
        <label htmlFor="password-length">Tamanho da senha (6-120): </label>
        <input 
          id="password-length"
          type="number" 
          min="6" 
          max="120" 
          value={length} 
          onChange={(e) => setLength(Number(e.target.value))} 
        />
      </div>

      {/* Botão de Gerar */}
      <button onClick={generatePassword} className="generate-btn">
        Gerar Senha
      </button>

      {/* Exibição Condicional da Senha */}
      {password && (
        <div className="result">
          <p>Sua senha gerada é:</p>
          <p className="password-display"><strong>{password}</strong></p>
        </div>
      )}
    </div>
  )
}

export default App
```

**Pontos importantes:**
- O evento `onChange` do `input` captura os números que o usuário digita e atualiza imediatamente a variável `length` na memória.
- O botão tem um evento `onClick` que "escuta" o clique do usuário e dispara nossa função `generatePassword`.
- A estrutura `{password && (...)}` só mostra o bloco com o resultado na tela caso a variável `password` não esteja vazia. Assim evitamos mostrar elementos desnecessários antes de qualquer senha ser gerada.
