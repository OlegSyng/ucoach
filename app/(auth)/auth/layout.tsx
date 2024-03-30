import { type PropsWithChildren } from "react";
import { CardWrapper } from "@/ui/components/wrappers";

export const metadata = {
    title: "login or register | ucoach",
    description: "login or register to ucoach",
};
  
function Layout({ children }: PropsWithChildren) {
    return (
        <div className="bg-white dark:bg-slate-800 flex w-full flex-col min-h-screen">
            <div className="w-full">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    <p>Logo</p>
                    {/* <Link href="/">
                    <Logo />
                    </Link>
        
                    <ThemeSwitch /> */}
                </div>
            </div>
            <div className="container flex-1 flex-center">
                <CardWrapper className="max-w-md w-full h-fit relative z-20 overflow-hidden">
                    {children}
                </CardWrapper>
            </div>
        </div>
    )
}

export default Layout;