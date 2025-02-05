import React, { useState } from "react";
import { Link } from "react-router-dom";

function Hoverpage() {
    const [name, updateName] = useState("david");

    return (
        <div className="flex flex-col justify-center items-center w-4/5 h-screen m-auto bg-theme-deskblue">
            <p className="text-4xl">yo {name}</p>
            <Link to="/">
                <p className="hover:underline">go back</p>
            </Link>
        </div>
    );
}

export default Hoverpage;