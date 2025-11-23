import { Button } from "../../components/ui/button";

export default function Page() {
    return <div className="pt-40 text-center">
        <p>All done! Shots for your shot 📸 </p>

        <p>Watch to see your photo in the slideshow once it&lsquo;s approved! </p>
        
        <p><Button><a href="/upload">Add another</a></Button></p>
        </div>;
}