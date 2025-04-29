export function AboutUs() {
    return (
        <section className="about-us-section">
            <h2 className="about-us-title">About Our Toy Store</h2>

            <p className="about-us-text">
                Welcome to our magical toy store! We specialize in unique, educational, and fun toys that spark creativity
                and imagination. Every item in our collection is carefully selected to bring joy and learning to children of all ages.
            </p>

            <h3 className="about-us-subtitle">About Me</h3>

            <p className="about-us-text">
                My name is Aviv Gibli, and I have always believed that toys are much more than just playthings — they are tools for growth, exploration, and wonder.
                With years of experience in education and a lifelong passion for creativity, I opened this store to share that joy with families everywhere.
            </p>

            <div className="about-us-image">
                <img src="src/assets/img/aviv-profile.jpg" alt="Owner Photo" />
            </div>
            <div className="about-us-grid">

                <div className="about-us-contact">
                    <h4>Contact Us</h4>
                    <p>Email: info@mistertoy.com</p>
                    <p>Phone: 123-456-7890</p>
                    <p>Address: 123 Toy St, Rosh HaAyin</p>
                </div>

                <div className="about-us-map">
                    <iframe
                        title="Store Location"
                        src="https://maps.google.com/maps?q=Rosh%20HaAyin&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
