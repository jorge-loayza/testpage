import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortingAlg, Item, SortComparator, bubbleSort } from 'src/lib/sorter';
import { Cancellation, Delay } from 'src/lib/util/operation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent implements OnInit {
  title = 'frontend';
  data: Item[] = [];
  availableSortingAlg: { name: string, alg: SortingAlg, active: boolean }[] = [
    { name: 'Bubble Sort', alg: SortingAlg.bubble, active: true },
    { name: 'Merge Sort', alg: SortingAlg.merge, active: false },
    { name: 'Heap Sort', alg: SortingAlg.heap, active: false },
  ];
  $start = new BehaviorSubject<boolean>(false);
  delayNumber: number = 10;
  delay: Delay = new Delay();
  cachedRandomData: Item[] = [];
  maxArraySize = 50;
  maxValue = 100;
  arraySize = this.maxArraySize;
  stopping: Cancellation | undefined;
  itemWidth = 15;


  ngOnInit(): void {
    this.randomize();
    this.delay.set(this.delayNumber);
  }
  randomize() {
    this.cachedRandomData = Array(this.maxArraySize)
      .fill(null)
      .map(() => ({
        value: Math.floor(Math.random() * this.maxValue),
        active: false, finalrun: false, swapping: false, pivot: false
      }));
    this.reset();
  }

  reset() {
    if (typeof this.stopping !== 'undefined') this.stopping.stop();
    this.data = this.cachedRandomData.slice(0, this.arraySize);
    for (let i = 0; i < this.data.length; i++)
    {
      this.data[i] = { ...this.data[i], active: false, swapping: false, finalrun: false, pivot: false }
    }
    delete this.stopping;
  }

  setSorter(sort: SortingAlg) {
    this.availableSortingAlg = this.availableSortingAlg.map(q => ({ ...q, active: q.alg === sort }))
  }

  get sortingAlg() {
    return this.availableSortingAlg.find(q => q.active);
  }

  async sort(data: Item[]) {
    if (typeof this.stopping !== 'undefined') this.stop();
    this.$start.next(true);
    const comparator: SortComparator = (a, b) => a.value > b.value;
    this.stopping = new Cancellation;
    data.forEach(q => ({ ...q, active: false, swapping: false, finalrun: false, pivot: false }))

    switch (this.sortingAlg!.alg) {
      case SortingAlg.bubble:
        await bubbleSort(data, comparator, this.delay, this.stopping);
        break;
      case SortingAlg.merge:
        // To-Do
        break;
      case SortingAlg.heap:
        //To-Do
        break;

    }
  }
  stop() {
    this.$start.next(false);
    if (typeof this.stopping !== 'undefined') this.stopping.stop();
    this.data.forEach(async q => ({ ...q, active: false, swapping: false, finalrun: false, pivot: false }))
  }
}
