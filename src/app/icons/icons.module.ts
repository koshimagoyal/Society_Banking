import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeSolidIcons } from '@app/icons/icons.font-awesome-solid';
import { fontAwesomeRegularIcons } from '@app/icons/icons.font-awesome-regular';
import { fontAwesomeBrandsIcons } from '@app/icons/icons.font-awesome-brands';



@NgModule({
    exports: [FontAwesomeModule],
})
export class IconsModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(
            fontAwesomeSolidIcons,
            fontAwesomeRegularIcons,
            fontAwesomeBrandsIcons
        );
    }
}
