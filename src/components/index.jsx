import styles from './styles.module.css'
import {useState} from 'react'


export default function PasswordManager() {

  const [password, setPassword] = useState('')
  const [length, setLength] = useState('')
  const [copyText, setCopyText] = useState('Copiar Senha')
  const [geradoText, setGeradoText] = useState('Gerar Senha')
  const [passwordHistory, setPasswordHistory] = useState([])

  const generatePassword = () => {
    if (length < 6 || length > 120) {
      alert("O tamanho da senha deve estar entre 6 e 120 caracteres")
      return
    }

    const validLength = length
    
    const charset = "1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?"
    let newPassword = ""
    
    for (let i = 0; i < validLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      newPassword += charset[randomIndex]
    }
    
    setPassword(newPassword)
    setPasswordHistory([newPassword, ...passwordHistory])

    setGeradoText('Gerada!')
    setTimeout(() => {
      setGeradoText('Gerar Senha')
    }, 3000)
    }

    const copyPassword = () => {
      navigator.clipboard.writeText(password)
      setCopyText('Copiado!')
      setTimeout(() => {
        setCopyText('Copiar Senha')
      }, 3000)
    }

    return (
        <div className={styles.appContainer}>
            <h1 className={styles.appTitle}>Gerador de Senha</h1>
        
        <div className={styles.controls}>
            <label className={styles.password_limit} htmlFor="password-length">Use uma senha de 6 a 120 caracteres</label>
            <input 
            id={styles.password_length}
            type="number" 
            min="6" 
            max="120" 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))} 
            />
        </div>

        <div className={styles.buttons}>
            <button onClick={generatePassword} className={styles.generate_btn}>
            {geradoText}
            </button>
            <button onClick={copyPassword} className={styles.copy_btn}>
            {copyText}
            </button>
        </div>

        {password && (
            <div className={styles.result}>
            <p>Sua senha gerada é:</p>
            <p className={styles.password_display}><strong>{password}</strong></p>
            </div>
        )}

        {passwordHistory.length > 0 && (
            <div className={styles.history}>
            <h3>
                Histórico de senhas:
            </h3>
            <ul>
            {passwordHistory.map((pass, index) => (
                <li key={index}>{pass}
                </li>
            ))}
            </ul>
        </div>
        )}
        </div>
    )
}