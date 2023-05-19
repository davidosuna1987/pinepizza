import { auth } from '@/config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import '@/components/questionary/Questionary.css'
import { useEffect, useState } from 'react'
import { fetchData, setData } from '@/firebase/api'
import { DocumentData } from 'firebase/firestore'

const Questionary = ({ handleLogout }: { handleLogout: () => void }) => {
  const [user] = useAuthState(auth)
  const [votes, setVotes] = useState<DocumentData>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getVotes = async () => {
    const { result } = await fetchData('votes')
    result && setVotes(result?.docs.map((doc) => doc.data()))
    setLoading(false)
  }

  useEffect(() => {
    getVotes()
  }, [])

  const setVote = async (vote: string) => {
    if (!user) return
    setLoading(true)
    const { success } = await setData('votes', user.uid, {
      vote,
      voter_id: user.uid,
    })
    success ? getVotes() : setLoading(false)
  }

  const getPineappleLoversCount = () =>
    loading
      ? '...'
      : votes?.filter((vote: DocumentData) => vote.vote === 'yes').length

  const getPineappleHatersCount = () =>
    loading
      ? '...'
      : votes?.filter((vote: DocumentData) => vote.vote === 'no').length

  const getOwnVote = () =>
    votes?.find((vote: DocumentData) => vote.voter_id === user?.uid)?.vote

  return (
    <section className="questionary">
      <div className="questionaryContainer">
        <header className="flex justify-between items-center absolute top-0 left-0 w-full p-5">
          <p>{user?.email}</p>
          <button
            className="px-6 py-1 border-white rounded-md border-2"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </header>
        <h1 className="title text-4xl mb-10 -mt-20">¿Pizza en la piña?</h1>
        <div className="flex items-center">
          <button className="pine-button" onClick={() => setVote('yes')}>
            💚 🍍🍕
          </button>
          <h3 className="text-xl ml-3">
            Piña Lovers: {getPineappleLoversCount()}
          </h3>
        </div>
        <div className="flex items-center">
          <button className="pine-button" onClick={() => setVote('no')}>
            ❌ 🍍🍕
          </button>
          <h3 className="text-xl ml-3">
            Piña Haters: {getPineappleHatersCount()}
          </h3>
        </div>
      </div>

      <h2 className="text-4xl mt-8">Tu voto</h2>
      <p className="text-xl">
        {loading
          ? '...'
          : getOwnVote()
          ? getOwnVote() === 'yes'
            ? '💚 Sabes lo que es bueno'
            : '👹 Irás al infierno...🔥'
          : 'No has votado'}
      </p>
    </section>
  )
}

export default Questionary
