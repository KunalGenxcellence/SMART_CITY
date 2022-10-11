import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';

@Component({
    selector: 'sb-side-nav-item',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;

    expanded = false;
    routeData!: SBRouteData;

    constructor() {}
    ngOnInit() {}

    HOItemsToHide = ['Add New Indent','Add New Receiving','Add Stock'];

    isMenuItemAllowed(ItemName:string){
        let userDetails = JSON.parse(localStorage.getItem("user_details") || '{}');
        if(userDetails['user_type'] == 'Daroga'){
                return true;
        }
        if(userDetails['user_type'] == 'HO'){
            if(this.HOItemsToHide.indexOf(ItemName) > -1){
                return false;
            }
            return true;
        }
    }
}
