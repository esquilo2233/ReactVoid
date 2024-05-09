import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Image from 'next/image';
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="pt-pt">
                <Head>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
                </Head>
                <body className="flex flex-col min-h-screen">
                    <div className="flex-1">
                    <div className="background-blur"></div>
                    <Main />
                    <NextScript />
                    </div>
                    <script async src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
