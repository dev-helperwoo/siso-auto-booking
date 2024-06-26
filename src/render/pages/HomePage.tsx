import { useEffect, useState } from "react";
import { Book } from "../../common/dto/Book";
import BookCard from "../components/home/BookCard";

const HomePage = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        window.electron.window.size({ width: 1200, height: 900 });
        getBooks();
        window.electron.siso.onUpdateBooks(onUpdateBooks);
    }, []);

    const creaetBook = async () => {
        if (books.length >= 20) {
            window.electron.window.dialog({ title: 'Error', text: '예약은 최대 20개 생성가능' });
            return;
        }

        const book = new Book();
        book.id = crypto.randomUUID();

        await window.electron.siso.createBook({ book: book });
    }

    const getBooks = async () => {
        const list = await window.electron.siso.getBooks();
        setBooks(list);
    }

    const onUpdateBooks = (books: Book[]) => {
        setBooks(books);
    };

    return (
        <div className="overflow-auto scrollbar-hide p-4">
            <div className="mb-5">
                <svg className="bi bi-plus-circle rounded-full p-1 cursor-pointer hover:bg-white hover:text-black transition-all" onClick={creaetBook}
                    xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
            </div>

            <div className="w-full grid grid-cols-3 gap-4 transition-all">
                {books.map((book) => (<BookCard book={book} setBooks={setBooks} />))}
            </div>
        </div >

    );
};

export default HomePage;