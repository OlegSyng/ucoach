import { type PropsWithChildren } from "react";

export const metadata = {
    title: "login or register | ucoach",
    description: "login or register to ucoach",
  };
  

function Layout({ children }: PropsWithChildren) {

    return (
        <div>{children}</div>
    )

}

export default Layout;