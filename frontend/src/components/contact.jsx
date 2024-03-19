function Contact() {
  return (
    <section className="w-full flex justify-center items-center mt-16 mb-12">
      <div className="w-11/12 bg-[#FFBE98] rounded-xl p-5 metro">
        <h1 className="text-xl">Contact Us</h1>
        <div className="mt-6 flex justify-start items-center">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVR4nO3WTYiNcRTH8Y9pjJfUiKZsyFsxSVMWk5SNlLBStqKUkpWNhQVLG8pGslSzGU0jCwoLalhYkDQbLLwUFiJdL8Vg9NS5Od3uNfftmYXmV8/inv99zvf8/+fl/zCn/0w92IVRvMMrnEbvbIAP4Dmm6zzX0FcWfC8mE+w1TmENduBDWUEsxaUa8JE6xz2E9/GfG1jQDfgevA2n33BiBsc5iPOdgOfF8f4KZ/ewocl3t8U7RWG2pV5cDic/cTKKrxktwURKQ8uaj/Fw8Bm7a9ZX4wLuY+Af8KJO1rYK78FIOPiIrWltMc7iRyrGx1jeAL6u9b1zJhxUMJzsG1Pf/8YVPInfjwI2kfLe8s4L7Q/nU9jpr7an/i52vCXsAymI6vMyZkLLWpEgx5N9EJ/CPlqn/YogruILbmOlNjUWkJvRfoX68SzBm+2Cto5+OvK+KtkvphwvKgveF3krQEeTfTjq4Ts2KVHHAj5Zc8S3ujFKZ9JCvAnQvmRfn6r6cJkBHEw5rhZe7TyYihopRQ8CcqjBeg6imAVdVX8U2ddIRSOdiyBGygqgEjO8nvJsL6UY74bzsbgBG8FfxKTsugbT+B1PQdTCi+u3NA2lz6frWIY7nd5qnQRRma2d12ozngb84WzDs6pfN3NShv4AkhmcSUgEH1cAAAAASUVORK5CYII=" />
          <a href="tel:+916204727999">
            <p>+91 6204727999</p>
          </a>
        </div>

        <div className="mt-2 flex justify-start items-center">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVR4nO3WTYiNcRTH8Y9pjJfUiKZsyFsxSVMWk5SNlLBStqKUkpWNhQVLG8pGslSzGU0jCwoLalhYkDQbLLwUFiJdL8Vg9NS5Od3uNfftmYXmV8/inv99zvf8/+fl/zCn/0w92IVRvMMrnEbvbIAP4Dmm6zzX0FcWfC8mE+w1TmENduBDWUEsxaUa8JE6xz2E9/GfG1jQDfgevA2n33BiBsc5iPOdgOfF8f4KZ/ewocl3t8U7RWG2pV5cDic/cTKKrxktwURKQ8uaj/Fw8Bm7a9ZX4wLuY+Af8KJO1rYK78FIOPiIrWltMc7iRyrGx1jeAL6u9b1zJhxUMJzsG1Pf/8YVPInfjwI2kfLe8s4L7Q/nU9jpr7an/i52vCXsAymI6vMyZkLLWpEgx5N9EJ/CPlqn/YogruILbmOlNjUWkJvRfoX68SzBm+2Cto5+OvK+KtkvphwvKgveF3krQEeTfTjq4Ts2KVHHAj5Zc8S3ujFKZ9JCvAnQvmRfn6r6cJkBHEw5rhZe7TyYihopRQ8CcqjBeg6imAVdVX8U2ddIRSOdiyBGygqgEjO8nvJsL6UY74bzsbgBG8FfxKTsugbT+B1PQdTCi+u3NA2lz6frWIY7nd5qnQRRma2d12ozngb84WzDs6pfN3NShv4AkhmcSUgEH1cAAAAASUVORK5CYII=" />
          <a href="tel:+916207291911">
            <p>+91 6207291911</p>
          </a>
        </div>

        <div className="mt-2 flex justify-start items-center">
          <img
            width={"28px"}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACP0lEQVR4nO2YPUhcQRDHfxo9LFKIRSyCEAJprBJUgh8gik3KFEkKQ0qbNHZWmpQpg5givaKmUFGsUqULsUonWCRwOYKgcPiRkHi5DQsjLMv72nfv3jtxf7Bw3M3s/uft3OzOA4/H4/F4whkD1oAKUAMUcAw8tuzagHXgQmwaHTXgB7AKjJKCDmApYoFdy74vI+EqZCyKpsREic9jB1RIEInTxnTcAgaAEvlRAgaBbUNHHRhJ4rxmOOkJimbD0LOSxKFiOOgnXzSDhp5yEofLaqNyTpswSlZ1isXM/1bgnqumVgmgF3gH/M0qgG7gBs3nJvAaOA0pp7EEGU9L/v0EXgKdTRDeKXMfxpwHqQJYtr4/AJ7KAdYobcAzmdMW+xV4lEUA94FvAQt8ASYaED8J7AXM+x14AbRHaHIK4LKczYRs8UfggYPwfuBDyDVlDuhKqMkpAPNPphc5sWzrIupuxNz60vfeOmsUcA68kUKRRlMq49sixr7A/ZHvbxm2PSLwt2X7T4K+k5Emd2NJh62AdKgC8zKqAb9rH+2buaa0B9lD4FNMCdTjMzDuOLfK8ySekvJnC98HnqQsvSrvq4Tunp5Lfq/LZ6eOqugAskb5AApG+R24SjtQu+otZaXFmvoh16Z+1XDYoXg2DT26L4ll1Mq5bXkKeb/YGpIHaN52h5NOsJjgTpN2nAGz1nqvgF8xfm9dnkBHk4PQ7aPJUYRtXcSneqEwIq/zygFNSJY7sGDtQE3WXHFJG4/H4/FcP/4D6IzAM0cJhbgAAAAASUVORK5CYII="
          />
          <a href="mailto:Ozoneclasses@gmail.com">
            <p className="pl-2">Ozoneclasses@gmail.com</p>
          </a>
        </div>

        <div className="mt-2 flex justify-start items-center">
          <img
            width={"28px"}
            src="data:image/png;base64,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"
          />
          <p className="pl-2">Kokar, Ranchi - 834001</p>
        </div>

        <div className="w-full mt-6 rounded-xl overflow-hidden h-64 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[rgba(255,255,255,0.25)] backdrop-blur-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.3631685049154!2d85.34662977478068!3d23.37507570308276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e16520298991%3A0x69569b837ded5a51!2sKokar%20Rd%2C%20Ranchi%2C%20Jharkhand%20834001!5e0!3m2!1sen!2sin!4v1710156617921!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
