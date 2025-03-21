'use client';

import DocsLayout from '../components/DocsLayout';
import DocsHeader from '../components/DocsHeader';
import {
  Section,
  CodeBlock,
  Alert,
  Steps,
  Step,
  Card
} from '../components/DocsContent';
import { FaDownload, FaPlay, FaCode, FaWrench } from 'react-icons/fa';

export default function GettingStartedPage() {
  return (
    <DocsLayout>
      <DocsHeader
        title="Pierwsze kroki z Kayak Racing"
        description="Przewodnik jak uruchomić i skonfigurować projekt Kayak Racing - od pobrania kodu do uruchomienia gry."
        tags={['Dla deweloperów', 'Instalacja', 'Uruchomienie']}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Alert type="info">
            Kayak Racing to gra wyścigowa wykorzystująca silnik Kajak Engine napisany w TypeScript. 
            Gra renderowana jest przy pomocy Canvas API i symuluje realistyczną fizykę pojazdów.
          </Alert>
          
          <Section id="prerequisites" title="Wymagania wstępne">
            <p className="mb-4">
              Przed rozpoczęciem pracy z projektem Kayak Racing upewnij się, że posiadasz następujące narzędzia:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Node.js (wersja 16.x lub nowsza)</li>
              <li>npm (zazwyczaj instalowany razem z Node.js)</li>
              <li>Nowoczesna przeglądarka internetowa (Chrome, Firefox, Edge)</li>
              <li>Edytor kodu (zalecany Visual Studio Code z dodatkami dla TypeScript)</li>
            </ul>
          </Section>
          
          <Section id="setup" title="Konfiguracja projektu">
            <Steps>
              <Step number="1" title="Pobieranie kodu źródłowego">
                <p>Sklonuj repozytorium z kodem gry na swój komputer:</p>
                <CodeBlock language="bash">
                  git clone https://github.com/twoja-nazwa/kayak-racing.git
                </CodeBlock>
                <p className="mt-2">Możesz również pobrać projekt jako plik ZIP z GitHuba i rozpakować go lokalnie.</p>
              </Step>
              
              <Step number="2" title="Instalacja zależności">
                <p>Przejdź do katalogu projektu i zainstaluj wszystkie wymagane pakiety:</p>
                <CodeBlock language="bash">
                  cd kayak-racing
                  npm install
                </CodeBlock>
                <p className="mt-2">
                  Proces instalacji może potrwać kilka minut, w zależności od prędkości połączenia internetowego.
                </p>
              </Step>
              
              <Step number="3" title="Konfiguracja środowiska">
                <p>
                  Jeśli projekt wymaga pliku konfiguracyjnego, utwórz plik <code>.env</code> w głównym katalogu projektu 
                  na podstawie dostarczonego szablonu:
                </p>
                <CodeBlock language="bash">
                  cp .env.example .env
                </CodeBlock>
                <p className="mt-2">
                  Otwórz plik <code>.env</code> w edytorze i dostosuj ustawienia według potrzeb (np. ścieżki do zasobów, 
                  konfigurację dźwięku).
                </p>
              </Step>
            </Steps>
          </Section>
          
          <Section id="running" title="Uruchomienie gry">
            <p className="mb-4">
              Po zakończeniu konfiguracji projektu możesz uruchomić grę w trybie deweloperskim, co pozwoli na 
              automatyczne odświeżanie po wprowadzeniu zmian w kodzie.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Uruchomienie serwera deweloperskiego:</h3>
              
              <CodeBlock language="bash">
                npm run dev
              </CodeBlock>
              
              <p className="mt-2">
                Po uruchomieniu tego polecenia, serwer deweloperski powinien wystartować i automatycznie otworzyć 
                grę w Twojej domyślnej przeglądarce. Jeśli przeglądarka nie otworzy się automatycznie, 
                otwórz ją ręcznie i przejdź pod adres <code>http://localhost:3000</code>.
              </p>
            </div>
            
            <Alert type="warning">
              Pamiętaj, że niektóre funkcje gry (np. dźwięki) mogą nie działać poprawnie, jeśli uruchomisz 
              stronę bezpośrednio z pliku (protokół <code>file://</code>) zamiast przez serwer HTTP. 
              Zawsze korzystaj z polecenia <code>npm run dev</code>.
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
              <Card title="Tryb produkcyjny" icon={<FaPlay />}>
                <p>
                  Aby zbudować wersję produkcyjną gry, użyj:
                </p>
                <CodeBlock language="bash">
                  npm run build
                </CodeBlock>
                <p className="mt-2">
                  Zbudowane pliki będą dostępne w katalogu <code>dist/</code> i mogą być uruchomione na dowolnym 
                  serwerze HTTP.
                </p>
              </Card>
              
              <Card title="Testy" icon={<FaWrench />}>
                <p>
                  Uruchomienie testów jednostkowych:
                </p>
                <CodeBlock language="bash">
                  npm test
                </CodeBlock>
                <p className="mt-2">
                  Zalecamy regularne uruchamianie testów, zwłaszcza po wprowadzeniu zmian w krytycznych 
                  komponentach silnika.
                </p>
              </Card>
            </div>
          </Section>
          
          <Section id="project-structure" title="Struktura projektu">
            <p className="mb-4">
              Projekt Kayak Racing jest zorganizowany w sposób ułatwiający nawigację i zrozumienie kodu:
            </p>
            
            <CodeBlock language="text">
{`kayak-racing/
├── src/
│   ├── components/          # Komponenty UI
│   ├── engine/              # Główne pliki silnika Kajak Engine
│   │   ├── KajakEngine.ts   # Główna klasa silnika
│   │   └── Scene.ts         # Zarządzanie sceną
│   ├── objects/             # Obiekty gry
│   │   ├── PhysicObject.ts  # Bazowa klasa dla obiektów z fizyką
│   │   ├── CarObject.ts     # Implementacja pojazdu
│   │   └── ...
│   ├── colliders/           # System kolizji
│   ├── utils/               # Funkcje pomocnicze
│   ├── types/               # Definicje typów TypeScript
│   └── index.ts             # Punkt wejściowy aplikacji
├── public/                  # Zasoby statyczne (obrazy, dźwięki)
├── dist/                    # Zbudowana wersja produkcyjna
└── package.json             # Konfiguracja projektu i zależności`}
            </CodeBlock>
            
            <p className="mt-4">
              Po zapoznaniu się ze strukturą projektu, warto przejrzeć dokumentację poszczególnych komponentów 
              silnika, aby lepiej zrozumieć ich działanie i interakcje.
            </p>
          </Section>
          
          <Section id="development" title="Rozwój projektu">
            <p className="mb-4">
              Kayak Racing jest projektem otwartym na modyfikacje i rozszerzenia. Oto kilka wskazówek, jak zacząć 
              z rozwojem własnych funkcji:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card title="Modyfikacja pojazdów" icon={<FaCar />}>
                <p>
                  Aby dodać nowy typ pojazdu, rozszerz klasę <code>CarObject</code> i dostosuj parametry fizyki 
                  do swoich potrzeb. Główne parametry to masa, przyczepność, opór i charakterystyka silnika.
                </p>
              </Card>
              
              <Card title="Tworzenie tras" icon={<FaMap />}>
                <p>
                  Nowe trasy można tworzyć definiując bariery, punkty kontrolne i powierzchnie. 
                  Skorzystaj z klas <code>BarrierSegment</code>, <code>CheckpointObject</code> i 
                  <code>TrackSurfaceSegment</code>.
                </p>
              </Card>
              
              <Card title="Rozszerzanie AI" icon={<FaRobot />}>
                <p>
                  Możesz stworzyć nowe typy zachowań AI rozszerzając klasę <code>CarAIController</code> 
                  i implementując własne algorytmy podejmowania decyzji.
                </p>
              </Card>
              
              <Card title="Efekty dźwiękowe" icon={<FaVolumeUp />}>
                <p>
                  Dodawaj lub modyfikuj dźwięki poprzez klasę <code>CarSoundSystem</code>. Pamiętaj o 
                  zainicjowaniu systemu dźwięku przed jego użyciem.
                </p>
              </Card>
            </div>
            
            <Alert type="success">
              <p>
                <strong>Wskazówka:</strong> Tryb debugowania w silniku Kajak Engine można włączyć, 
                wywołując metodę <code>setDebugMode(true)</code> na instancji silnika. Spowoduje to 
                wyświetlenie dodatkowych informacji, takich jak kolizje, promienie AI i właściwości powierzchni.
              </p>
            </Alert>
          </Section>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Szybki start</h3>
              <div className="space-y-3 text-white">
                <div>
                  <p className="font-semibold">1. Pobierz kod:</p>
                  <p className="text-sm">git clone [repozytorium]</p>
                </div>
                <div>
                  <p className="font-semibold">2. Zainstaluj zależności:</p>
                  <p className="text-sm">npm install</p>
                </div>
                <div>
                  <p className="font-semibold">3. Uruchom grę:</p>
                  <p className="text-sm">npm run dev</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <h3 className="font-bold text-blue-800 mb-2">Technologie</h3>
              <ul className="space-y-1 text-sm">
                <li>• TypeScript</li>
                <li>• HTML5 Canvas</li>
                <li>• Web Audio API</li>
                <li>• Vite (bundler)</li>
                <li>• npm (zarządzanie pakietami)</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Przydatne linki</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/docs/engine" className="text-blue-600 hover:underline">Dokumentacja Kajak Engine</a>
                </li>
                <li>
                  <a href="/docs/player-guide" className="text-blue-600 hover:underline">Przewodnik dla graczy</a>
                </li>
                <li>
                  <a href="/docs/tracks" className="text-blue-600 hover:underline">Tworzenie tras</a>
                </li>
                <li>
                  <a href="https://github.com/twoja-nazwa/kayak-racing/issues" className="text-blue-600 hover:underline">Zgłaszanie problemów</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}