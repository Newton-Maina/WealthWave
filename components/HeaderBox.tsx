const HeaderBox = ({type = "title", title, subtext,
                       user}: HeaderBoxProps) => {
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="header-box">
            <p className="text-12 font-medium text-bankGradient mb-1 uppercase tracking-wider">{date}</p>
            <h1 className="header-box-title">
                {title}
                {type === 'greeting' && (
                    <span className="text-bankGradient">
                        &nbsp;{user}
                    </span>
                )}
            </h1>
            <p className="header-box-subtext">{subtext}</p>
        </div>
    )
}
export default HeaderBox
