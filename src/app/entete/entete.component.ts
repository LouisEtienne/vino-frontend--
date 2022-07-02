import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { IProduit } from '../iproduit';
import { ApibieroService } from '../Serv/apibiero.service';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { IUser } from '../iuser';
import { Router } from '@angular/router';
import { DialogInvitationComponent } from '../dialog-invitation/dialog-invitation.component';

@Component({
    selector: 'app-entete',
    templateUrl: './entete.component.html',
    styleUrls: ['./entete.component.scss']
})
    
export class EnteteComponent implements OnInit {
    estConnecte!:boolean;
    sTitre!:string;
    bouteille!:IProduit;
    @Input() loggedUser:boolean=true;


    constructor(private authServ:AuthService, private route:Router, private bieroServ:ApibieroService, public dialog: MatDialog) {
    }

    ngOnInit(): void {

        // this.loggedUser = 'false';
        this.authServ.statut().subscribe(bLogin=>{
            this.estConnecte = bLogin;
        })
        
        this.authServ.getTitre().subscribe(leTitre =>{
        this.sTitre = leTitre;
        })
    }

    /** Connexion */
    openLogin(): void {
        sessionStorage['estConnecte'] = false;
        this.dialog.open(DialogLoginComponent, {
            width: '30%',
            data: this.loggedUser
        })
    }

    /** Enregistrement */
    openRegister(): void {
        this.dialog.open(DialogRegisterComponent, {
            width: '30%',
            data: this.loggedUser
        }).afterClosed().subscribe(res=>{ });
    }

    logout():boolean{
        this.authServ.setConnexion(!this.estConnecte);
        this.authServ.setTitre('Vino');
        this.route.navigateByUrl("");
        return this.authServ.getConnexion();
    }

    connect():boolean{
        return this.authServ.getConnexion();
    }
}
