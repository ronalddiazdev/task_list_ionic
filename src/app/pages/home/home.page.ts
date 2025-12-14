import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonIcon, IonLabel, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonReorderGroup, IonReorder, ItemReorderEventDetail } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { AlertService } from 'src/app/services/alertService';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonIcon,
    FormsModule,
    IonLabel,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonReorderGroup,
    IonReorder
  ],
})
export class HomePage {

  private alertService: AlertService = inject(AlertService);

  public task: string = '';
  public tasks: string[] = [];
  private KEY_TASKS: string = 'tasks';

  constructor() {

    addIcons({
      addOutline,
      trashOutline
    });
  }

  async ionicViewWillEnter() {
    const tasksPreferences = await Preferences.get({ key: this.KEY_TASKS });

    if(tasksPreferences.value) {
      const tasks = JSON.parse(tasksPreferences.value);

      if(Array.isArray(tasks)) {
        this.tasks = tasks;
      }

    }
  }


  addTask() {
    console.log(this.task);

    if (this.existsTask(this.task)) {
      this.alertService.showMessage("Error", "La tarea ya existe");
    } else {
      this.tasks.push(this.task);
      this.task = '';
      this.saveTasks();
      this.alertService.showMessage("Exito", "Tarea agregada con éxito");
    }

  }

  private existsTask(task: string) {
    return this.tasks.find((item: string) => item.toUpperCase().trim() === task.toLocaleUpperCase().trim());
  }


  confirmDelete(task: string) {
    this.alertService.showMessageConfirm("Confirmar", "¿Estás seguro de que deseas eliminar esta tarea?", () => this.removeTask(task));
  }

  removeTask(task: string) {
    const index = this.tasks.findIndex((item: string) => item.toUpperCase().trim() === task.toLocaleUpperCase().trim());

    if (index != -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  reorderTasks(event: CustomEvent<ItemReorderEventDetail>) {
    this.tasks = event.detail.complete(this.tasks);
    this.saveTasks();
  }

  saveTasks(){
    Preferences.set({
      key: this.KEY_TASKS,
      value: JSON.stringify(this.tasks)
    });
  }

}
