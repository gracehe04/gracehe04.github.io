import '../components/About.css';
function About() {

    return (
        <section id = "about" className = "about-section">
            <h2>About</h2>
            <h4>👋 It's great to see you here!</h4>
            <ul className = "jot-notes">
            <li>
                I'm an undergraduate student at New York University studying Applied Psychology and Computer Science. I enjoy creating functional web applications and I am passionate about continuously improving my skills!
            </li>
            </ul>
            <h4>🌱 I’m currently working on ...</h4>
            <ul className = "jot-notes">
                <li>
                    Processing and analyzing datasets at&nbsp;  
                    <a href="https://www.thesocialcreatures.org/" target="_blank" rel="noopener noreferrer">
                        Social Creatures
                    </a>
                    &nbsp;using Python (pandas) & R to support REDCap data migration for the&nbsp;
                    <a href="https://www.thesocialcreatures.org/bondedbybaby" target="_blank" rel="noopener noreferrer">
                    Bonded by Baby
                    </a>
                    &nbsp;project.
                </li>
                <li>
                    Building the&nbsp;
                    <a href="https://gdg.community.dev/gdg-on-campus-new-york-university-new-york-united-states/" target="_blank" rel="noopener noreferrer">
                       Google Developers Group @ NYU's
                    </a>
                    &nbsp;first Dev Team :)
                </li>
            </ul>
            <h4>🌸 In the past I worked at...</h4>
            <ul className = "jot-notes">
                <li>
                    <a href="https://engineering.nike.com/" target="_blank" rel="noopener noreferrer">
                    Nike
                    </a>
                    &nbsp;as a Software Engineering Intern on the Finance & Procurement Technology team, where I engineered a TypeScript AWS service to automate financial reconciliation for 300K+ daily transactions ($5.52B revenue).
                </li>
                <li>
                    <a href="https://eulerity.com/" target="_blank" rel="noopener noreferrer">
                    Eulerity
                    </a>
                    &nbsp;as a Software Engineering Intern where I worked developed key front-end features with TypeScript and React, integrating REST APIs for dashboards used by 100+ clients.
                </li>
                <li>
                    <a href="https://www.helloconstellation.com/" target="_blank" rel="noopener noreferrer">
                        Constellation
                    </a>
                    &nbsp;where I engineered scripts using Python to analyze 20,000+ data points across all projects, expediting team operations by 95%
                </li>
            </ul>

        </section>
    );
}

export default About;