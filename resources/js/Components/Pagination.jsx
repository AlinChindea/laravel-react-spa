import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
              {links.map((link) => (
                  <Link
                    preserveScroll
                    href={link.url || ''}
                    key={link.label}
                    className={`inline-flex py-2 px-3 rounded-lg text-xs text-gray-900
                    ${
                      link.active ? 'bg-blue-600 text-white' : ''
                    }
                    ${
                      !link.url ? '!disabled:opacity-50 cursor-not-allowed' : 'hover:bg-blue-900 hover:text-white'
                    }
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  >
                  </Link>
              ))}
          </nav>
    );
}
