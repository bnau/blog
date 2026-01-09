---
title: "Tester ses scénarios utilisateur avec Testing-Library"
description: "Une bibliothèque permettant de réaliser des tests frontend du point de vue de l'utilisateur"
pubDate: "Oct 13 2021"
cover: "cover.jpg"
---

La mise en place de tests de logiciels est une pratique très répandue.
Cela ajoute un meilleur niveau de qualité sur le code d'une application.

Choisir sa solution de tests peut être un exercice difficile. En effet,
il existe de nombreux outils, frameworks, patterns permettant d'aborder
ce sujet.

Dans cet article, nous étudierons [Testing Library](https://testing-library.com/), une bibliothèque
permettant de réaliser des tests frontend du point de vue de
l'utilisateur.

## La diversité de l'écosystème frontend

L'écosystème frontend évolue fréquemment. Les paradigmes changent (templating côté
serveur, spa…), de nouveaux frameworks sortent (Angular, React, Vue
JS…), de nouvelles librairies continuent d'apparaître...

À ce jour, aucun des grands frameworks javascript n'a réussi à s'imposer
comme standard de l'environnement frontend. Aussi, le code source d'une application
Web peut fortement varier d'un projet à l'autre selon la stack choisie.

Qu'en est-il des tests ? Chaque framework propose au moins une librairie
pour tester le rendu de ses composants. Nous pouvons citer Enzyme pour
React, la solution native pour Angular, etc. Toutefois, ces tests
souffrent souvent du même défaut, à savoir que leur code source est très
lié au framework javascript utilisé.

### Plusieurs frameworks, plusieurs manières d'écrire un composant

**Exemple avec Angular**

```javascript
@Component({
  selector: 'todo-list',
  template: `
    <ul>
      <li *ngFor="let todo of todos">{{todo}}</li>
    </ul>
    <input #newTodo/>
    <button (click)="addTodo(newTodo.value)">Add</button>
  `
})
export class TodoListComponent {
  todos = [];

  addTodo(newTodo) {
    this.todos.push(newTodo);
  }
}
```

**Exemple avec React**

```javascript
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const todoInput = useRef(null);

  const addTodo = newTodo => setTodos([...todos, newTodo]);

  return <>
    <ul>
      {todos.map((todo, i) => <li key={i}>{todo}</li>)}
    </ul>
    <input ref={todoInput}/>
    <button onClick={() => addTodo(todoInput.current.value)}>Add</button>
  </>;
}
```

Les deux codes sources sont très
différents, bien que le résultat affiché dans le navigateur soit
strictement identique.

### Plusieurs frameworks, plusieurs manières de tester un composant

**Exemple avec Angular**

```javascript
describe('TodoListComponent', () => {
  it('should add two todos', () => {
    // Arrange
    TestBed.configureTestingModule({declarations: [TodoListComponent]});
    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();

    const hostElement = fixture.nativeElement;
    const button = hostElement.querySelector('button')
    const input = hostElement.querySelector('input')!;

    // Act
    input.value = 'First';
    input.dispatchEvent(new Event('change'));
    button.dispatchEvent(new Event('click'));
    input.value = 'Second';
    input.dispatchEvent(new Event('change'));
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    //Assert
    expect(hostElement.querySelectorAll('li').item(0)!.textContent).toEqual('First');
    expect(hostElement.querySelectorAll('li').item(1)!.textContent).toEqual('Second');
  });
});
```

**Exemple avec Enzyme pour React**

```javascript
describe('TodoList', () => {
  test('should add two todos', () => {
    // Arrange
    const wrapper = mount(<TodoList/>);

    // Act
    wrapper.find('input').instance().value = 'First';
    wrapper.find('button').simulate('click');
    wrapper.find('input').instance().value = 'Second';
    wrapper.find('button').simulate('click');

    //Assert
    expect(wrapper.find('li')).toHaveLength(2);
    expect(wrapper.find('li').at(0).text()).toBe('First');
    expect(wrapper.find('li').at(1).text()).toBe('Second');
  });
});
```

Les scénarios utilisateurs sont identiques, mais l'écriture des tests varie fortement d'un framework à l'autre.

## Testing Library à la rescousse

Testing library est une bibliothèque permettant de requêter et
d'interagir avec un DOM. Cette librairie incite donc à rédiger des tests
qui n'auront pas connaissance du détail d'implémentation des composants.

Testing library est fournie avec de nombreuses bibliothèques tierces
qui facilitent l'intégration de son API dans les principaux
frameworks (Angular, React, Vue JS…).

### Utilisation de Testing Library avec Angular et React

**Exemple avec Angular**

```javascript
describe('TodoListComponent', () => {
  test('should add two todos', async () => {
    // Arrange
    await render(TodoListComponent);

    // Act
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'First'}});
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Se-cond'}});
    fireEvent.click(screen.getByRole('button'));

    // Assert
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('First');
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('Second');
  });
});
```

**Exemple avec React**

```javascript
describe('TodoList', () => {
  test('should add two todos', () => {
    // Arrange
    render(<TodoList />);

    // Act
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'First'}});
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Se-cond'}});
    fireEvent.click(screen.getByRole('button'));

    //Assert
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('First');
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('Second');
  });
});
```

Hormis la création des composants, les deux
tests sont strictement identiques. L'expérience utilisateur
étant la même quel que soit le framework utilisé, il est normal que cela
se constate au niveau des tests.

### Les principaux types de requête

Testing Library permet de requêter le DOM de plusieurs manières, via
différents types de requête. Parmi les plus intéressantes, nous avons :

- `getByRole` : Requête des éléments selon leur représentation dans l'arbre d'accessibilité.
- `getByLabelText` : Requête des éléments en passant par leur label. Très utile pour tester des formulaires.
- `getByPlaceholderText` : Requête des éléments selon leur placeholder. Utile si on n'a pas de label.
- `getByText` : Retrouve un élément selon son texte affiché à l'écran. Utile pour requêter une div, span, etc.
- `getByDisplayValue` : Permet de récupérer des éléments de formulaire selon leur valeur.

En dernier recours, il existe également la requête `getByTestId` qui
récupère des éléments selon leur attribut test-id.

Il est possible de requêter des éléments de manière asynchrone en
remplaçant le prefix `get` par le prefix `find`.

### Testing Playground : un excellent plugin de navigateur

Il existe un plugin navigateur qui retourne les requêtes correspondant à
un élément donné. Les requêtes sont fournies par ordre de préconisation.

Le plugin Chrome est disponible [ici](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano).

### Tester l'accessibilité de son application

Testing Library permet de réaliser des
tests qui simulent l'utilisation d'une interface d'accessibilité comme
un lecteur d'écran. Les requêtes de types `roles`
récupèrent les éléments du DOM via leurs rôles [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) correspondant.

La fonction `isInaccessible` détermine si un élément du DOM sera
exclu de l'arbre d'accessibilité.

### Utilitaire pour simuler les événements utilisateur

Lorsqu'on utilise une application dans un navigateur, de nombreux
événements sont générés. Par exemple, si un utilisateur souhaite cliquer
sur un bouton à l'aide de sa souris, les événements suivants
seront lancés :

- `mouseOver`
- `mouseMove`
- `mouseDown`
- `focus`
- `mouseUp`
- `click`

Pour rédiger un test similaire à ce qui se produit dans le navigateur,
il faut générer toute cette suite d'événements. Pour nous simplifier
la tâche, il existe une librairie satellite -
`@testing-library/user-event` – qui fournit plusieurs cas classiques
d'interactions entre l'utilisateur et le navigateur.

La précédente suite d'évènements serait générée en appelant simplement `userEvent.click`.

## Conclusion

Comme nous avons pu le voir, les tests écrits avec Testing Library
n'ont pas connaissance de l'implémentation des composants. Le découplage entre l'écriture
des tests et l'implémentation des composants permet de facilement refactorer son code.

Ensuite, cette librairie invite à tester l'accessibilité de
l'application, chose qui est, malheureusement, trop souvent négligée.

Je terminerai sur une remarque plus subjective. Je trouve qu'il est plus
simple d'appliquer le TDD avec Testing Library. En effet, le
comportement d'un composant est souvent bien anticipé, alors que son
implémentation sera connue a posteriori. Il est donc pratique de
commencer par rédiger un test qui répètera le scénario utilisateur bien
identifié en amont.

---

**Liens utiles :**

- [Testing Library](https://testing-library.com/)
- [GitHub - Testing Library](https://github.com/testing-library)
