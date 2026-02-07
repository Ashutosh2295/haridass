import { motion } from 'framer-motion';

const Saints = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 animate-fade-in bg-white">
            <h1 className="text-4xl font-serif font-semibold text-maroon-700 text-center mb-12">Our Story</h1>

            <div className="space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-8 items-center border border-gray-100 p-8"
                >
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/23/Srila_Prabhupada_1974.jpg"
                            alt="A.C. Bhaktivedanta Swami Prabhupada"
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="md:flex-1">
                        <h2 className="text-2xl font-serif font-semibold text-maroon-700 mb-2">A.C. Bhaktivedanta Swami Prabhupada</h2>
                        <h3 className="text-base text-maroon-600 mb-4 font-medium">Founder-Acharya of ISKCON</h3>
                        <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                            His Divine Grace A.C. Bhaktivedanta Swami Prabhupada appeared in this world in 1896 in Calcutta, India. He met his spiritual master, Srila Bhaktisiddhanta Sarasvati Goswami, in 1922.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            At the advanced age of 69, in 1965, he traveled to New York City aboard a cargo ship. With just 40 rupees and a trunk of Bhagavatam commentaries, he started a global spiritual revolution, establishing ISKCON.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row-reverse gap-8 items-center border border-gray-100 p-8"
                >
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Bhaktisiddhanta_Sarasvati.jpg"
                            alt="Srila Bhaktisiddhanta Sarasvati Thakura"
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="md:flex-1">
                        <h2 className="text-2xl font-serif font-semibold text-maroon-700 mb-2">Srila Bhaktisiddhanta Sarasvati Thakura</h2>
                        <h3 className="text-base text-maroon-600 mb-4 font-medium">Simha Guru (Lion Guru)</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Srila Bhaktisiddhanta Sarasvati Thakura was a powerfully influential teacher of devotional service. He established 64 temples across India and revolutionized the propagation of Krishna consciousness.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-8 items-center border border-gray-100 p-8"
                >
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <img
                            src="https://chaitanyacharan.com/wp-content/uploads/2015/11/gaur-kishor-das-babaji.jpg"
                            alt="Srila Gaura Kishora Dasa Babaji"
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="md:flex-1">
                        <h2 className="text-2xl font-serif font-semibold text-maroon-700 mb-2">Srila Gaura Kishora Dasa Babaji</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            A fully self-realized soul who lived a reclusive life of intense devotion in Vrindavan and Navadvipa. Although illiterate by worldly standards, his words were full of the deepest Vedic wisdom.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Saints;
