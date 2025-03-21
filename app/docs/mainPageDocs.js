'use client';

import DocsLayout from '../components/DocsLayout';
import DocsHeader from '../components/DocsHeader';
import {
  Section,
  CodeBlock,
  Alert,
  Card
} from '../components/DocsContent';
import { FaGamepad, FaCar, FaMap, FaCode, FaVolumeUp } from 'react-icons/fa';

export default function KajakRacingCodeOverview() {
  return (
    <DocsLayout>
      <DocsHeader
        title="Kajak Racing - Przegląd kodu"
        description="Kompaktowy przegląd kluczowych elementów kodu gry Kayak Racing, pokazujący strukturę i interakcje między komponentami."
        tags={['Kod źródłowy', 'Architektura', 'TypeScript']}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Section id="overview" title="Przegląd architektury">
            <p className="mb-4">
              Kayak Racing jest zbudowany na bazie silnika Kajak Engine, wykorzystującego Canvas API do renderowania.
              Cała struktura kodu opiera się na systemie obiektów fizycznych, kolizji, scen i wyścigów, tworząc
              kompleksowy symulator wyścigów kajakowych z realistyczną fizyką.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Hierarchia klas:</h3>
              
              <pre className="p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm">
{`GameObject
├── PhysicObject
│   ├── CarObject
│   ├── CheckpointObject
│   └── BarrierSegment
├── MapObject
├── Scene
└── RaceManager`}
              </pre>
            </div>
            
            <Alert type="info">
              Silnik gry wykorzystuje architekturę komponentową, gdzie obiekty są budowane z mniejszych,
              wyspecjalizowanych części takich jak kolizje, dźwięki czy renderowanie. Umożliwia to dużą
              elastyczność i ponowne wykorzystanie kodu.
            </Alert>
          </Section>
          
          <Section id="physics-and-collisions" title="System fizyki i kolizji">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card title="System kolizji" icon={<FaCode />}>
                <p>
                  Kayak Racing wykorzystuje hierarchię kolizji, od prostych prostokątów (AABB) po złożone wielokąty.
                  Klasa <code>Collider</code> stanowi abstrakcyjną bazę dla wszystkich typów kolizji.
                </p>
                <ul className="list-disc mt-2 ml-4 text-sm">
                  <li>AABBCollider - prostokątne kolizje</li>
                  <li>PolygonCollider - wielokątne kolizje</li>
                  <li>LineCollider - kolizje liniowe</li>
                </ul>
              </Card>
              
              <Card title="Fizyka pojazdów" icon={<FaCar />}>
                <p>
                  <code>CarObject</code> implementuje zaawansowany model fizyki pojazdów z uwzględnieniem
                  przyczepności, sił oporu, momentów obrotowych i akceleracji. Model bazuje na realistycznej
                  symulacji zachowań samochodów wyścigowych.
                </p>
              </Card>
            </div>
            
            <CodeBlock language="typescript" title="Fragment kodu fizyki pojazdu">
{`// Fragment z CarObject.ts
update(deltaTime: number): void {
    this._soundSystem.update();

    const angle = this.rotation
    const cosAngle = Math.cos(angle)
    const sinAngle = Math.sin(angle)

    const surfaceProps = this.surfaceManager
        ? this.surfaceManager.getSurfacePropertiesAt(this.position)
        : { gripMultiplier: 1.0, dragMultiplier: 1.0 };

    const localVelocity = {
        forward: this.velocity.x * sinAngle + this.velocity.y * cosAngle,
        right: this.velocity.x * cosAngle - this.velocity.y * sinAngle,
    };

    // Obliczenia dla fizyki pojazdu...
}`}
            </CodeBlock>
          </Section>
          
          <Section id="ai-and-race" title="Sztuczna inteligencja i system wyścigów">
            <p className="mb-4">
              Gra zawiera rozbudowany system AI dla pojazdów oraz kompleksowy system zarządzania wyścigami,
              włączając w to punkty kontrolne, okrążenia i statusy graczy.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card title="Sztuczna inteligencja" icon={<FaGamepad />}>
                <p>
                  System AI wykorzystuje raycasty do wykrywania środowiska i implementuje kilka typów zachowań
                  kierowców AI, od agresywnych po taktycznych.
                </p>
                <ul className="list-disc mt-2 ml-4 text-sm">
                  <li>AIBehaviorType.STRAIGHT_LINE_MASTER</li>
                  <li>AIBehaviorType.STEADY_MIDDLE</li>
                  <li>AIBehaviorType.AGGRESSIVE_CHASER</li>
                  <li>AIBehaviorType.TACTICAL_BLOCKER</li>
                </ul>
              </Card>
              
              <Card title="System wyścigów" icon={<FaMap />}>
                <p>
                  <code>RaceManager</code> zarządza całością wyścigu: checkpointami, pozycjami graczy, okrążeniami
                  i statusem wyścigu. <code>CheckpointObject</code> śledzi postęp graczy na torze.
                </p>
              </Card>
            </div>
            
            <CodeBlock language="typescript" title="Fragment kodu AI pojazdu">
{`// Fragment z CarAI.ts
private updateAggressiveChaser(
    checkpoint: CheckpointObject,
    roadAnalysis: RoadAnalysis,
    playerCar: CarObject
): void {
    const toPlayer = subtract(playerCar.position, this.car.position)
    const distanceToPlayer = length(toPlayer)

    const target =
        distanceToPlayer < 20 ? playerCar.position : checkpoint.position
    const steerAngle = this.calculateSteeringToTarget(target, roadAnalysis)
    this.car.setSteerAngle(steerAngle)

    if (
        distanceToPlayer < 15 &&
        roadAnalysis.minDistance > this.ai.rayLength * 0.5
    ) {
        this.car.setThrottle(this.maxSpeed)
    } else {
        this.car.setThrottle(this.maxSpeed * 0.7)
    }
}`}
            </CodeBlock>
          </Section>
          
          <Section id="sound-and-environment" title="System dźwięku i otoczenia">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card title="System dźwięku" icon={<FaVolumeUp />}>
                <p>
                  <code>CarSoundSystem</code> zarządza dźwiękami pojazdu, w tym dźwiękiem silnika, poślizgów i kolizji.
                  <code>EngineSoundGenerator</code> tworzy dynamicznie zmieniające się dźwięki silnika w oparciu o prędkość.
                </p>
              </Card>
              
              <Card title="System otoczenia" icon={<FaMap />}>
                <p>
                  <code>TrackSurfaceManager</code> definiuje różne rodzaje nawierzchni toru (asfalt, piasek, błoto itd.)
                  z unikalnymi właściwościami wpływającymi na przyczepność i hamowanie pojazdu.
                </p>
              </Card>
            </div>
            
            <Alert type="warning">
              System dźwięku wymaga inicjalizacji przed użyciem. Upewnij się, że wywołujesz <code>initialize()</code>
              na obiektach dźwiękowych przed rozpoczęciem gry, aby uniknąć problemów z ładowaniem zasobów audio.
            </Alert>
          </Section>
          
          <Section id="scene-management" title="Zarządzanie sceną">
            <p className="mb-4">
              <code>Scene</code> jest głównym kontenerem dla wszystkich obiektów gry. Zarządza ich aktualizacją, renderowaniem
              i interakcjami. Używa QuadTree do optymalizacji wykrywania kolizji, co znacząco poprawia wydajność.
            </p>
            
            <CodeBlock language="typescript" title="Fragment kodu zarządzania sceną">
{`// Fragment z Scene.ts
update(deltaTime: number): void {
    // Aktualizacja AI
    this.aiControllers.forEach((controller) => {
        const playerCar = Array.from(this._gameObjects.values()).find(
            (obj) => obj instanceof CarObject && obj.isPlayer
        ) as CarObject;

        if (playerCar) {
            controller.update(this, playerCar);
        }
    });

    // Optymalizacja kolizji QuadTree
    this._quadTree.clear();
    for (const obj of this._gameObjects.values()) {
        if (obj.collider) {
            this._quadTree.insert(obj);
        }
    }

    // Aktualizacja obiektów
    for (const obj of this._gameObjects.values()) {
        obj.collider.updatePosition(
            vec2D(obj.position.x, -obj.position.y),
            obj.rotation
        );
        obj.update(deltaTime);
    }

    this._raceManager.update();
    this.overlapManager.processOverlaps();
}`}
            </CodeBlock>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Komponenty sceny:</h3>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>QuadTree</strong> - struktura danych optymalizująca wykrywanie kolizji
                </li>
                <li>
                  <strong>OverlapManager</strong> - zarządza nakładaniem się obiektów i zdarzeniami kolizji
                </li>
                <li>
                  <strong>RaceManager</strong> - kontroluje logikę wyścigu (punkty kontrolne, pozycje, itd.)
                </li>
                <li>
                  <strong>MapObject</strong> - obiekt reprezentujący tło i układ toru
                </li>
              </ul>
            </div>
          </Section>
          
          <Section id="track-elements" title="Elementy toru">
            <p className="mb-4">
              Tor wyścigowy składa się z wielu elementów, które definiują doświadczenie gracza.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card title="Bariery" icon={<FaMap />}>
                <p>
                  <code>BarrierSystem</code> i <code>BarrierSegment</code> tworzą bariery toru z segmentów liniowych.
                  Każdy segment ma zdefiniowaną grubość i elastyczność odbicia przy kolizji.
                </p>
              </Card>
              
              <Card title="Powierzchnie" icon={<FaMap />}>
                <p>
                  <code>TrackSurfaceSegment</code> definiuje obszary o różnych właściwościach powierzchni, 
                  np. asfalt, piasek, błoto. Wpływają one na przyczepność i opór pojazdu.
                </p>
              </Card>
            </div>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Checkpointy wyścigowe:</h3>
              <p>
                <code>CheckpointObject</code> śledzi postęp pojazdów na torze. Checkpointy specjalnego typu mogą 
                służyć jako linia mety lub kontrolować ukończenie okrążenia.
              </p>
              
              <CodeBlock language="typescript">
{`// Fragment z CheckpointObject.ts
export default class CheckpointObject extends PhysicObject {
    private readonly isFinishLine: boolean
    private readonly order: number
    private activated: boolean

    constructor(options: CheckpointObjectOptions) {
        super(options)
        this.isFinishLine = options.isFinishLine || false
        this.order = options.order
        this.activated = false
        this.spriteManager!.hidden = true
    }

    // Aktywacja checkpointu przez pojazd gracza
    activate(car: CarObject): void {
        if (!car.isPlayer) return
        this.activated = true
        console.log(\`Checkpoint \${this.order} activated\`)
    }
}`}
              </CodeBlock>
            </div>
          </Section>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Kluczowe klasy</h3>
              <ul className="space-y-1 text-white">
                <li>• KajakEngine - główna klasa silnika</li>
                <li>• Scene - zarządzanie obiektami i interakcjami</li>
                <li>• PhysicObject - obiekt z fizyką</li>
                <li>• CarObject - pojazd z realistyczną fizyką</li>
                <li>• Collider - abstrakcja dla kolizji</li>
                <li>• RaceManager - zarządzanie wyścigiem</li>
                <li>• CarAI - sztuczna inteligencja pojazdów</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Cechy i systemy</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-medium">Fizyka pojazdów</span>: Realistyczny model fizyki z uwzględnieniem przyczepności, oporu i właściwości powierzchni
                </li>
                <li>
                  <span className="font-medium">QuadTree</span>: Wydajna struktura danych do optymalizacji wykrywania kolizji
                </li>
                <li>
                  <span className="font-medium">System dźwięku</span>: Dynamicznie generowane dźwięki silnika i efekty
                </li>
                <li>
                  <span className="font-medium">AI</span>: Różne typy zachowań kierowców AI z zaawansowanym systemem raycasting
                </li>
                <li>
                  <span className="font-medium">System wyścigów</span>: Kompleksowe zarządzanie checkpointami, okrążeniami i pozycjami
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}