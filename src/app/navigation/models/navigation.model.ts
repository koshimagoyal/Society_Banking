export interface SBRouteData {
    title?: string;
    activeTopNav?: string;
}

export interface SideNavItems {
    [index: string]: SideNavItem;
}

export interface SideNavItem {
    icon?: string;
    text: string;
    link?: string;
    submenu?: SideNavItem[];
}

export interface SideNavSection {
    text?: string;
    items: string[];
}
export interface EmpSideNavItems {
    [index: string]: EmpSideNavItem;
}

export interface EmpSideNavItem {
    icon?: string;
    text: string;
    link?: string;
    submenu?: EmpSideNavItem[];
}

export interface EmpSideNavSection {
    text?: string;
    items: string[];
}
