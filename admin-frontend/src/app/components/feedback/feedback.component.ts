import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedbackDto } from 'src/app/interfaces/feedbackDto';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  messages: FeedbackDto[] = [];

  constructor(private messageService: MessagesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.messageService.getAll().subscribe({
      next: (mes) => this.messages = mes,
      error: (e) => this.toastr.error("Can't get messages from the server.", "Error")
    });
  }

  showSidebar() {
    let navigationElement: any = document.querySelector('.navigation');
    let main: any = document.querySelector('.main');
    navigationElement.classList.toggle('active');
    main.classList.toggle('active');
  }

  updateTheme(color: string) {
    let r: any = document.querySelector(':root');
    r.style.setProperty('--color-primary', color);
  }

  deleteFeedback(id: number) {
    this.messageService.delete(id).subscribe({
      next: () => { this.messages = this.messages.filter(m => m.id != id); this.toastr.success("", 'Feedback deleted.'); },
      error: () => { this.toastr.error("", "Error while deleting feedback."); }
    });
  }
}
