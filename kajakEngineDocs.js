'use client';

import DocsLayout from '../components/DocsLayout';
import DocsHeader from '../components/DocsHeader';
import TableOfContents from '../components/TableOfContents';
import {
  Section,
  CodeBlock,
  Alert,
  Example,
  Table,
  Card
} from '../components/DocsContent';
import { FaCode, FaGamepad, FaLayerGroup, FaRandom } from 'react-icons/fa';

export default function KajakEngineCodeDocs() {
  const headings = [
    { id: 'overview', text: 'Przegląd silnika', level: 2 },
    { id: 'architecture', text: 'Architektura', level: 2 },
    { id: 'core-class', text: 'Klasa KajakEngine', level: 2 },
    { id: 'scenes', text: 'System scen', level: 2 },
    { id: 'game-loop', text: 'Pętla gry', level: 2 },
    { id: 'implementation', text: 'Implementacja', level: 2 },
  ];

  return (
    <DocsLayout>
      <DocsHeader
        title="Dokumentacja kodu Kajak Engine"
        description="Techniczne wyjaśnienie działania kodu bazowego silnika Kajak Engine - lekki silnik gry 2D oparty na Canvas API."
        tags={['Kod źródłowy', 'TypeScript', 'Architektura']}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Section id="overview" title="Przegląd silnika">
            <p className="mb-4">
              Kajak Engine to lekki silnik gry 2D napisany w TypeScript, który wykorzystuje HTML Canvas do renderowania. 
              Jest to podstawowy szkielet silnika używanego w grze Kayak Racing, zaprojektowany z myślą o prostocie 
              i elastyczności.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Kluczowe cechy:</h3>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Architektura oparta na scenach</li>
                <li>Pętla gry z kontrolą czasu delta</li>
                <li>Zintegrowany system renderowania 2D</li>
                <li>Obsługa różnych tła dla różnych scen</li>
                <li>Tryb debugowania</li>
              </ul>
            </div>
            
            <Alert type="info">
              W tej dokumentacji skupiamy się na podstawowej strukturze silnika. Pełna implementacja 
              Kayak Engine zawiera dodatkowe funkcje, takie jak fizyka wody, system kolizji, AI i inne, 
              które są omówione w innych sekcjach dokumentacji.
            </Alert>
          </Section>
          
          <Section id="architecture" title="Architektura">
            <p className="mb-4">
              Kajak Engine opiera się na prostej architekturze składającej się z kilku kluczowych elementów:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card title="KajakEngine" icon={<FaCode />}>
                <p>
                  Główna klasa silnika, która zarządza pętlą gry, scenami i kontekstem Canvas. 
                  Jest to centralna część odpowiedzialna za uruchamianie i zatrzymywanie gry.
                </p>
              </Card>
              
              <Card title="Scene" icon={<FaLayerGroup />}>
                <p>
                  Reprezentuje pojedynczą scenę w grze. Każda scena może zawierać własne obiekty, 
                  logikę i unikalne tło. Silnik może przełączać się między różnymi scenami.
                </p>
              </Card>
              
              <Card title="Game Loop" icon={<FaRandom />}>
                <p>
                  Pętla gry jest odpowiedzialna za aktualizację stanu gry i renderowanie w stałym tempie, 
                  wykorzystując requestAnimationFrame i czas delta dla płynnej animacji.
                </p>
              </Card>
              
              <Card title="Canvas Rendering" icon={<FaGamepad />}>
                <p>
                  Silnik używa HTML Canvas API do renderowania grafiki 2D. Kontekst canvas jest przekazywany 
                  do aktywnej sceny w celu rysowania elementów.
                </p>
              </Card>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Diagram zależności:</h3>
              
              <pre className="p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm">
{`    ┌───────────────┐
    │  KajakEngine  │
    └───────┬───────┘
            │ zarządza
            ▼
    ┌───────────────┐  zawiera   ┌───────────────┐
    │     Scene     │◄──────────►│      Map      │
    └───────┬───────┘            └───────────────┘
            │ aktualizuje/rysuje
            ▼
    ┌───────────────┐
    │  Game Objects │
    └───────────────┘`}
              </pre>
            </div>
          </Section>
          
          <Section id="core-class" title="Klasa KajakEngine">
            <p className="mb-4">
              Klasa <code>KajakEngine</code> jest głównym punktem wejścia silnika. Jest odpowiedzialna za inicjalizację 
              Canvas, zarządzanie scenami i uruchomienie pętli gry.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Właściwości:</h3>
              
              <Table
                headers={['Właściwość', 'Typ', 'Opis']}
                data={[
                  ['_scenes', 'Map<number, Scene>', 'Mapa przechowująca wszystkie sceny zarejestrowane w silniku'],
                  ['_currentScene', 'Scene | null', 'Aktualnie aktywna scena'],
                  ['_ctx', 'CanvasRenderingContext2D', 'Kontekst renderowania 2D Canvas'],
                  ['_canvas', 'HTMLCanvasElement', 'Element Canvas używany do renderowania'],
                  ['_lastTimestamp', 'number', 'Ostatni timestamp używany do obliczenia czasu delta'],
                  ['_running', 'boolean', 'Flaga informująca czy silnik jest uruchomiony']
                ]}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Metody:</h3>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>constructor(canvas: HTMLCanvasElement)</strong> - Inicjalizuje silnik z podanym elementem Canvas
                </li>
                <li>
                  <strong>setDebugMode(debugMode: boolean)</strong> - Włącza lub wyłącza tryb debugowania dla aktualnej sceny
                </li>
                <li>
                  <strong>setCurrentScene(sceneId: number)</strong> - Przełącza aktualną scenę na podstawie identyfikatora
                </li>
                <li>
                  <strong>start()</strong> - Uruchamia pętlę gry
                </li>
                <li>
                  <strong>stop()</strong> - Zatrzymuje pętlę gry
                </li>
                <li>
                  <strong>gameLoop(timestamp: number)</strong> - Prywatna metoda implementująca główną pętlę gry
                </li>
              </ul>
            </div>
            
            <Example 
              title="Tworzenie instancji silnika"
              description="Przykład inicjalizacji silnika Kajak"
            >
              <CodeBlock language="typescript">
{`// Pobierz element canvas z DOM
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

// Utwórz instancję silnika
const engine = new KajakEngine(canvas);

// Dodaj sceny (zakładając, że mamy już zdefiniowane sceny)
engine.scenes.set(1, new MenuScene());
engine.scenes.set(2, new GameplayScene());

// Ustaw aktualną scenę
engine.setCurrentScene(1);

// Uruchom silnik
engine.start();`}
              </CodeBlock>
            </Example>
          </Section>
          
          <Section id="scenes" title="System scen">
            <p className="mb-4">
              Kajak Engine używa systemu scen do organizacji różnych części gry. Każda scena może reprezentować różne 
              stany gry, takie jak menu główne, rozgrywka, ekran pauzy itp.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Zarządzanie scenami:</h3>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Sceny są przechowywane w mapie, gdzie kluczem jest unikalny identyfikator numeryczny
                </li>
                <li>
                  Aktywna scena jest aktualizowana i renderowana w każdej klatce pętli gry
                </li>
                <li>
                  Przy przełączaniu scen, silnik automatycznie aktualizuje tło Canvas na podstawie właściwości sceny
                </li>
                <li>
                  Sceny mogą mieć jedno lub dwa tła (podstawowe i drugorzędne) dla efektów parallax
                </li>
              </ul>
            </div>
            
            <CodeBlock language="typescript" title="Implementacja przełączania scen">
{`setCurrentScene(sceneId: number): void {
    const scene = this._scenes.get(sceneId)
    if (scene) {
        this._currentScene = scene
        this._canvas.style.cssText = \`
        background: rgba(0, 0, 0, 1);
        background-size: cover;
    \`
        this._canvas.style.backgroundImage = \`url(\${this._currentScene.map.backgroundSrc})\`

        if(this._currentScene.map.secondBackgroundSrc) {
            const img = document.createElement("img");
            img.src = this._currentScene.map.secondBackgroundSrc;
            this._canvas.parentElement!.appendChild(img);
        }
    }
}`}
            </CodeBlock>
            
            <Alert type="info">
              System scen jest elastyczny i może być rozszerzany. Każda scena może implementować własne 
              metody <code>update</code> i <code>draw</code>, które są wywoływane przez silnik.
            </Alert>
          </Section>
          
          <Section id="game-loop" title="Pętla gry">
            <p className="mb-4">
              Serce silnika Kajak stanowi pętla gry, która jest odpowiedzialna za aktualizację stanu gry i renderowanie 
              z odpowiednią częstotliwością. Pętla wykorzystuje <code>requestAnimationFrame</code> do synchronizacji 
              z odświeżaniem ekranu.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Implementacja pętli gry:</h3>
              
              <CodeBlock language="typescript">
{`private gameLoop(timestamp: number): void {
    if (!this._running) return

    const deltaTime = (timestamp - this._lastTimestamp) / 1000
    this._lastTimestamp = timestamp

    if (this._currentScene) {
        this._currentScene.update(deltaTime)
        this._currentScene.draw(this._ctx)
    }

    requestAnimationFrame(this.gameLoop)
}`}
              </CodeBlock>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Kluczowe elementy pętli:</h3>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Czas delta</strong> - Obliczany jako różnica między bieżącym i poprzednim timestampem, 
                  podzielona przez 1000 dla konwersji na sekundy. Pozwala na płynną animację niezależną od liczby 
                  klatek na sekundę.
                </li>
                <li>
                  <strong>Aktualizacja sceny</strong> - Metoda <code>update</code> aktualnej sceny jest wywoływana 
                  z przekazaniem czasu delta, umożliwiając aktualizację stanu obiektów gry.
                </li>
                <li>
                  <strong>Renderowanie</strong> - Metoda <code>draw</code> aktualnej sceny jest wywoływana z kontekstem 
                  Canvas, co pozwala na renderowanie obiektów gry.
                </li>
                <li>
                  <strong>Rekurencyjne wywołanie</strong> - <code>requestAnimationFrame</code> planuje kolejne wywołanie 
                  pętli gry, zapewniając ciągłość animacji.
                </li>
              </ul>
            </div>
            
            <Alert type="warning">
              Należy pamiętać, że metody <code>update</code> i <code>draw</code> sceny powinny być zoptymalizowane, 
              aby zapewnić płynną animację (powyżej 60 FPS). Zbyt złożone obliczenia mogą prowadzić do spadku wydajności.
            </Alert>
          </Section>
          
          <Section id="implementation" title="Implementacja">
            <p className="mb-4">
              Oto pełna implementacja podstawowej klasy <code>KajakEngine</code>, która stanowi rdzeń silnika:
            </p>
            
            <CodeBlock language="typescript" title="KajakEngine.ts">
{`import Scene from "./Scene.ts"

export default class KajakEngine {
    private _scenes: Map<number, Scene> = new Map()
    private _currentScene: Scene | null = null
    private readonly _ctx: CanvasRenderingContext2D
    private readonly _canvas: HTMLCanvasElement
    private _lastTimestamp: number = 0
    private _running: boolean = false

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas
        canvas.width = 1280
        canvas.height = 720

        const ctx = this._canvas.getContext("2d")
        if (!ctx) throw new Error("Unable to get 2d context from canvas")
        this._ctx = ctx

        this.gameLoop = this.gameLoop.bind(this)
    }

    get currentScene(): Scene | null {
        return this._currentScene
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx
    }

    get scenes(): Map<number, Scene> {
        return this._scenes
    }

    setDebugMode(debugMode: boolean): void {
        if (!this._currentScene) return
        this._currentScene.debugMode = debugMode
    }

    setCurrentScene(sceneId: number): void {
        const scene = this._scenes.get(sceneId)
        if (scene) {
            this._currentScene = scene
            this._canvas.style.cssText = \`
            background: rgba(0, 0, 0, 1);
            background-size: cover;
        \`
            this._canvas.style.backgroundImage = \`url(\${this._currentScene.map.backgroundSrc})\`

            if(this._currentScene.map.secondBackgroundSrc) {
                const img = document.createElement("img");
                img.src = this._currentScene.map.secondBackgroundSrc;
                this._canvas.parentElement!.appendChild(img);
            }
        }
    }

    start(): void {
        if (!this._running) {
            this._running = true
            this._lastTimestamp = performance.now()
            requestAnimationFrame(this.gameLoop)
        }
    }

    stop(): void {
        this._running = false
    }

    private gameLoop(timestamp: number): void {
        if (!this._running) return

        const deltaTime = (timestamp - this._lastTimestamp) / 1000
        this._lastTimestamp = timestamp

        if (this._currentScene) {
            this._currentScene.update(deltaTime)
            this._currentScene.draw(this._ctx)
        }

        requestAnimationFrame(this.gameLoop)
    }
}`}
            </CodeBlock>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Rozszerzanie silnika:</h3>
              
              <p className="mb-4">
                Podstawowa implementacja może być rozszerzona o dodatkowe funkcje, takie jak:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>System wejścia (obsługa klawiatury, myszy, kontrolerów)</li>
                <li>Menedżer zasobów do ładowania i zarządzania obrazami, dźwiękami, itp.</li>
                <li>System fizyki dla realistycznej interakcji obiektów</li>
                <li>System kolizji</li>
                <li>System dźwięku</li>
                <li>System cząsteczek dla efektów wizualnych</li>
              </ul>
              
              <p className="mt-4">
                Te rozszerzenia mogą być implementowane jako dodatkowe klasy, które współpracują z głównym silnikiem.
              </p>
            </div>
          </Section>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Powiązane zasoby</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/docs/engine/scene" className="text-blue-600 hover:underline">Dokumentacja klasy Scene</a>
                </li>
                <li>
                  <a href="/docs/engine/game-objects" className="text-blue-600 hover:underline">Obiekty gry</a>
                </li>
                <li>
                  <a href="/docs/engine/extensions" className="text-blue-600 hover:underline">Rozszerzenia silnika</a>
                </li>
                <li>
                  <a href="/docs/engine/examples" className="text-blue-600 hover:underline">Przykłady użycia</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}