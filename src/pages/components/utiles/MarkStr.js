export default function Mark(term, text) {
    try {
        let re = new RegExp('\b'+term);
        const res = text.match(re)
        console.log(res)
        return text
    } catch (error) {
        return ""
    }

}