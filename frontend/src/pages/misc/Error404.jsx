import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
                <p className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</p>
                <p className="text-lg text-gray-600 mb-8">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}