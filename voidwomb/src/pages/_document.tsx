import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Image from 'next/image';
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    
                </Head>
                <body>
                    <Main />
                    <div className="mb-8 flex justify-center background-blur content-container">
                        <Image src="/img/Voidwomb-foto.jpg" alt="" width={500} height={500} />
                    </div>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
