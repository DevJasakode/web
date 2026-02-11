"use client";
import { SmartLink } from "@/components/link";
import { useI18n } from "@/i18n";

export function Footer() {
    const { t } = useI18n();

    return (
        <footer className="w-full bg-white dark:bg-gray-950 relative shadow-[0px_-10px_20px_-5px_rgba(0,0,0,0.1)]">
            <section className="px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8">
                <section className="col-span-1 md:col-span-2">
                    <p className="text-[1rem]">
                        <span
                            className="text-blue-700 mr-1 font-bold text-[1.1rem]"
                        >
                            {t("app.title")}
                        </span>
                        – {t("footer.desc")}
                    </p>
                </section>
                <section className="flex flex-col gap-1">
                    <div className="text-[1.2rem] font-bold">{t("footer.our_company")}</div>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">{t("nav.about")}</a>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">{t("nav.solutions")}</a>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">Community</a>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">Testimonial</a>
                    <SmartLink 
                        href={{ pathname: "/[locale]/legal" }}
                        className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max"
                    >
                        Legal Information
                    </SmartLink>
                </section>
                <section className="flex flex-col gap-1">
                    <div className="text-[1.2rem] font-bold">Service</div>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">Tech Consultant</a>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">Tech Researcher</a>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">Software Development</a>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">Software Design</a>
                </section>
                <section className="flex flex-col gap-1">
                    <div className="text-[1.2rem] font-bold">Innovation</div>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">Jasakode Network</a>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">JUI</a>
                    <a href="#" className="relative text-[0.9rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max">Portify</a>
                </section>
                <section className="flex flex-col gap-1">
                    <div className="text-[1.2rem] font-bold">Contact</div>
                    <a target="_blank" href="https://wa.me/6285159003374" className="relative text-[1rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zm9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75zM7.5 3H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1c-1.24 0-2.45-.2-3.57-.57a.8.8 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.15 15.15 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.4 11.4 0 0 1 8.5 4c0-.55-.45-1-1-1" />
                        </svg>
                        <span className="ms-2">+6285159003374</span>
                    </a>
                    <a target="_blank" href="mailto:info@jasakode.com" className="relative text-[1rem] md:text-[1.2rem] cursor-pointer hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 w-max flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z" />
                        </svg>
                        <span className="ms-2">info@jasakode.com</span>
                    </a>
                    <section className="mt-2">
                        <div className="mb-1">{t("footer.follow_us")}</div>
                        <div className="flex items-center flex-wrap">
                            <a href="#" className="w-10 h-10 flex items-center justify-center overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-200/30 dark:bg-gray-600/20 rounded-full">
                                <svg className="w-[50%]" xmlns="http://www.w3.org/2000/svg" width="256" height="180" viewBox="0 0 256 180">
                                    <path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134" />
                                    <path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-200/30 dark:bg-gray-600/20 rounded-full">
                                <svg className="w-[40%]" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                                    <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3" />
                                    <path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 1 1-10.5 10.49a10.5 10.5 0 0 1 10.5-10.49m20.41 29h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-200/30 dark:bg-gray-600/20 rounded-full">
                                <svg className="w-[50%]" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                                    <g fill="currentColor">
                                        <path fillRule="evenodd" d="M64 1.512c-23.493 0-42.545 19.047-42.545 42.545c0 18.797 12.19 34.745 29.095 40.37c2.126.394 2.907-.923 2.907-2.047c0-1.014-.04-4.366-.058-7.92c-11.837 2.573-14.334-5.02-14.334-5.02c-1.935-4.918-4.724-6.226-4.724-6.226c-3.86-2.64.29-2.586.29-2.586c4.273.3 6.523 4.385 6.523 4.385c3.794 6.504 9.953 4.623 12.38 3.536c.383-2.75 1.485-4.628 2.702-5.69c-9.45-1.075-19.384-4.724-19.384-21.026c0-4.645 1.662-8.44 4.384-11.42c-.442-1.072-1.898-5.4.412-11.26c0 0 3.572-1.142 11.7 4.363c3.395-.943 7.035-1.416 10.65-1.432c3.616.017 7.258.49 10.658 1.432c8.12-5.504 11.688-4.362 11.688-4.362c2.316 5.86.86 10.187.418 11.26c2.728 2.978 4.378 6.774 4.378 11.42c0 16.34-9.953 19.938-19.427 20.99c1.526 1.32 2.886 3.91 2.886 7.88c0 5.692-.048 10.273-.048 11.674c0 1.13.766 2.458 2.922 2.04c16.896-5.632 29.07-21.574 29.07-40.365C106.545 20.56 87.497 1.512 64 1.512" clipRule="evenodd" />
                                        <path d="M37.57 62.596c-.095.212-.428.275-.73.13c-.31-.14-.482-.427-.382-.64c.09-.216.424-.277.733-.132c.31.14.486.43.38.642zm1.723 1.924c-.203.187-.6.1-.87-.198c-.278-.297-.33-.694-.124-.884c.208-.188.593-.1.87.197c.28.3.335.693.123.884zm1.677 2.448c-.26.182-.687.012-.95-.367c-.262-.377-.262-.83.005-1.013c.264-.182.684-.018.95.357c.262.385.262.84-.005 1.024zm2.298 2.368c-.233.257-.73.188-1.093-.163c-.372-.343-.475-.83-.242-1.087c.237-.257.736-.185 1.102.163c.37.342.482.83.233 1.086zm3.172 1.374c-.104.334-.582.485-1.064.344c-.482-.146-.796-.536-.7-.872c.1-.336.582-.493 1.067-.342c.48.144.795.53.696.87zm3.48.255c.013.35-.396.642-.902.648c-.508.012-.92-.272-.926-.618c0-.354.4-.642.908-.65c.506-.01.92.272.92.62m3.24-.551c.06.342-.29.694-.793.787c-.494.092-.95-.12-1.014-.46c-.06-.35.297-.7.79-.792c.503-.088.953.118 1.017.466zm0 0" />
                                    </g>
                                    <path fill="currentColor" d="M24.855 108.302h-10.7a.5.5 0 0 0-.5.5v5.232a.5.5 0 0 0 .5.5h4.173v6.5s-.937.32-3.53.32c-3.056 0-7.327-1.116-7.327-10.508c0-9.393 4.448-10.63 8.624-10.63c3.614 0 5.17.636 6.162.943c.31.094.6-.216.6-.492l1.193-5.055a.47.47 0 0 0-.192-.39c-.403-.288-2.857-1.66-9.058-1.66c-7.144 0-14.472 3.038-14.472 17.65c0 14.61 8.39 16.787 15.46 16.787c5.854 0 9.405-2.502 9.405-2.502c.146-.08.162-.285.162-.38v-16.316a.5.5 0 0 0-.5-.5zM79.506 94.81H73.48a.5.5 0 0 0-.498.503l.002 11.644h-9.392V95.313a.5.5 0 0 0-.497-.503H57.07a.5.5 0 0 0-.498.503v31.53c0 .277.224.503.498.503h6.025a.5.5 0 0 0 .497-.504v-13.486h9.392l-.016 13.486c0 .278.224.504.5.504h6.038a.5.5 0 0 0 .497-.504v-31.53a.497.497 0 0 0-.497-.502m-47.166.717c-2.144 0-3.884 1.753-3.884 3.923c0 2.167 1.74 3.925 3.884 3.925c2.146 0 3.885-1.758 3.885-3.925c0-2.17-1.74-3.923-3.885-3.923m2.956 9.608H29.29c-.276 0-.522.284-.522.56v20.852c0 .613.382.795.876.795h5.41c.595 0 .74-.292.74-.805v-20.899a.5.5 0 0 0-.498-.502zm67.606.047h-5.98a.5.5 0 0 0-.496.504v15.46s-1.52 1.11-3.675 1.11s-2.727-.977-2.727-3.088v-13.482a.5.5 0 0 0-.497-.504h-6.068a.5.5 0 0 0-.498.504v14.502c0 6.27 3.495 7.804 8.302 7.804c3.944 0 7.124-2.18 7.124-2.18s.15 1.15.22 1.285c.07.136.247.273.44.273l3.86-.017a.5.5 0 0 0 .5-.504l-.003-21.166a.504.504 0 0 0-.5-.502zm16.342-.708c-3.396 0-5.706 1.515-5.706 1.515V95.312a.5.5 0 0 0-.497-.503H107a.5.5 0 0 0-.5.503v31.53a.5.5 0 0 0 .5.503h4.192c.19 0 .332-.097.437-.268c.103-.17.254-1.454.254-1.454s2.47 2.34 7.148 2.34c5.49 0 8.64-2.784 8.64-12.502s-5.03-10.988-8.428-10.988zm-2.36 17.764c-2.073-.063-3.48-1.004-3.48-1.004v-9.985s1.388-.85 3.09-1.004c2.153-.193 4.228.458 4.228 5.594c0 5.417-.935 6.486-3.837 6.398zm-63.689-.118c-.263 0-.937.107-1.63.107c-2.22 0-2.973-1.032-2.973-2.368v-8.866h4.52a.5.5 0 0 0 .5-.504v-4.856a.5.5 0 0 0-.5-.502h-4.52l-.007-5.97c0-.227-.116-.34-.378-.34h-6.16c-.238 0-.367.106-.367.335v6.17s-3.087.745-3.295.805a.5.5 0 0 0-.36.48v3.877a.5.5 0 0 0 .497.503h3.158v9.328c0 6.93 4.86 7.61 8.14 7.61c1.497 0 3.29-.48 3.586-.59c.18-.067.283-.252.283-.453l.004-4.265a.51.51 0 0 0-.5-.502z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-200/30 dark:bg-gray-600/20 rounded-full">
                                <svg className="w-[40%]" xmlns="http://www.w3.org/2000/svg" width="256" height="290" viewBox="0 0 256 290">
                                    <path fill="#ff004f" d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53a67 67 0 0 1-13.918-1.456v37.413c-24.711 0-47.59-7.851-66.272-21.195v96.996c0 48.523-39.356 87.855-87.9 87.855c-18.113 0-34.949-5.473-48.934-14.86c15.962 16.313 38.222 26.432 62.848 26.432c48.548 0 87.905-39.332 87.905-87.857v-96.995zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898M69.673 225.607a40 40 0 0 1-8.203-24.33c0-22.192 18.001-40.186 40.21-40.186a40.3 40.3 0 0 1 12.197 1.883v-48.593c-4.61-.631-9.262-.9-13.912-.801v37.822a40.3 40.3 0 0 0-12.203-1.882c-22.208 0-40.208 17.992-40.208 40.187c0 15.694 8.997 29.281 22.119 35.9" />
                                    <path d="M175.803 92.849c18.683 13.344 41.56 21.195 66.272 21.195V76.631c-13.794-2.937-26.005-10.141-35.186-20.162c-15.715-9.802-27.038-25.972-30.358-44.898h-34.643v189.843c-.079 22.132-18.049 40.052-40.21 40.052c-13.058 0-24.66-6.221-32.007-15.86c-13.12-6.618-22.118-20.206-22.118-35.898c0-22.193 18-40.187 40.208-40.187c4.255 0 8.356.662 12.203 1.882v-37.822c-47.692.985-86.047 39.933-86.047 87.834c0 23.912 9.551 45.589 25.053 61.428c13.985 9.385 30.82 14.86 48.934 14.86c48.545 0 87.9-39.335 87.9-87.857z" />
                                    <path fill="#00f2ea" d="M242.075 76.63V66.516a66.3 66.3 0 0 1-35.186-10.047a66.47 66.47 0 0 0 35.186 20.163M176.53 11.57a68 68 0 0 1-.728-5.457V0h-47.834v189.845c-.076 22.13-18.046 40.05-40.208 40.05a40.06 40.06 0 0 1-18.09-4.287c7.347 9.637 18.949 15.857 32.007 15.857c22.16 0 40.132-17.918 40.21-40.05V11.571zM99.966 113.58v-10.769a89 89 0 0 0-12.061-.818C39.355 101.993 0 141.327 0 189.845c0 30.419 15.467 57.227 38.971 72.996c-15.502-15.838-25.053-37.516-25.053-61.427c0-47.9 38.354-86.848 86.048-87.833" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-200/30 dark:bg-gray-600/20 rounded-full">
                                <svg className="w-[35%]" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" color="currentColor" fill="currentColor">
                                    <path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z" />
                                </svg>
                            </a>
                        </div>
                    </section>
                </section>
            </section>
            <section className="w-full bg-blue-600 text-white px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left order-2 md:order-1">
                    &copy; Copyright
                    <a target="_blank" className="mx-2 hover:text-green-400" href="https://www.jasakode.com">
                        Jasakode.com
                    </a>
                    All Rights Reserved.
                </div>
                <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-end order-1 md:order-2">
                    {/* <CopyrightLink link="/term-of-service" label="Term of Service" />
                    <CopyrightLink link="/privacy-policy" label="Privacy Policy" />
                    <CopyrightLink link="/legal" label="Legal" />
                    <CopyrightLink link="/contact" label="Contact" />
                    <CopyrightLink link="/sitemap" label="Sitemap" /> */}
                </div>
            </section>
        </footer>
    )
};
