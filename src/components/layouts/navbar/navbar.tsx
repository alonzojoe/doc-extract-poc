import { Wrapper } from "../../container"

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 bg-white/60 backdrop-blur-md right-0 z-100 shadow-md">
            <Wrapper className="flex-between px-4 py-3">
                <img src="/images/logos/document_poc.png" height={28} width={130} alt="app-logo" />
            </Wrapper>
        </nav>
    )
}