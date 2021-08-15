import { useState } from "react";

const Background = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time =  "";

    return <div>
        <section>
            <span class="showTime"></span>
            <span class="showDAte">`${date}`</span>
        </section>
        </div>
    
}