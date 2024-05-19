import NavLink from './NavLink';

export default function AuthNavigation({ user }) {
    return (
        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
            </NavLink>
            <NavLink href={route('project.index')} active={route().current('project.index')}>
                Projects
            </NavLink>
            <NavLink href={route('task.index')} active={route().current('task.index')}>
                All Tasks
            </NavLink>
            <NavLink href={route('user.index')} active={route().current('user.index')}>
                Users
            </NavLink>
        </div>
    );
}
