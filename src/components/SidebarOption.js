import '../styles/Sidebar.css';

export default function SidebarOption({title, Icon}) {

    return (
        <div className="sidebar__option">
            {Icon && <Icon className="sidebar__option--icon"/>}
            <p>{title}</p>
        </div>
    )
}
