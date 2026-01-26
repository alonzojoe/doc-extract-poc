import { Navbar } from './components/layouts/navbar/navbar'
import { Wrapper } from './components/container'

function App() {

  return (
    <>
      <Navbar />
      <main className="text-base text-sub antialiased h-dvh">
        <section id="home" className="pt-20 lg:pt-32 bg-accent">
          <Wrapper className='px-3 py-2 grid items-center grid-cols-1 lg:grid-cols-2 gap-8'>
            <p className='bg-red-500'>Content</p>
            <p className='bg-green-500'>Content</p>
          </Wrapper>
        </section>
      </main>
    </>
  )
}

export default App
