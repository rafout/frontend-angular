import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  @Input() titulo!: string;
  @Input() mensagem!: string;
  @Output() fechar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public fecharModal() {
    this.fechar.emit();
  }

}
