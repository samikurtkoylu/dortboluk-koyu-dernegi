import {
  denetimKurulu,
  digerGorevler,
  finansKurulu,
  genclikKollari,
  istisareKurulu,
  kadinKollari,
  president,
  type Person,
  viceChairs,
} from "./board-data";

type PanelProps = {
  id?: string;
  title: string;
  tone: "primary" | "teal" | "accent" | "gold";
  people: Person[];
  numbered?: boolean;
  columns?: number;
};

function Panel({ id, title, tone, people, numbered = false, columns = 1 }: PanelProps) {
  return (
    <section className={`org-panel org-panel--${tone}`} id={id}>
      <h4 className="org-panel-head">
        {title}
        <span className="org-count">{people.length} kişi</span>
      </h4>
      <ol className="org-people" style={{ "--org-cols": columns } as React.CSSProperties}>
        {people.map((person, index) => (
          <li key={person.name}>
            {numbered ? <span className="org-no">{index + 1}</span> : null}
            <span className="org-person">
              <span className="org-name">{person.name}</span>
              {person.role ? <span className="org-role">{person.role}</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Fork({ columns }: { columns: number }) {
  return (
    <div className="org-fork" style={{ "--org-cols": columns } as React.CSSProperties} aria-hidden>
      {Array.from({ length: columns }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export function OrgChart() {
  return (
    <figure className="orgchart" aria-label="Elazığ Dörtbölük Köyü Derneği yönetim şeması">
      <div className="org-root">
        <span className="org-root-role">{president.role}</span>
        <strong className="org-root-name">{president.name}</strong>
      </div>

      <Fork columns={1} />

      <Panel
        id="yonetim-kurulu"
        title="Yönetim Kurulu Başkan Yardımcıları"
        tone="primary"
        people={viceChairs}
        numbered
        columns={2}
      />

      <Fork columns={2} />

      <div className="org-row" style={{ "--org-cols": 2 } as React.CSSProperties}>
        <Panel
          id="denetim-kurulu"
          title="Denetim Kurulu"
          tone="teal"
          people={denetimKurulu}
          numbered
        />
        <Panel
          id="istisare-kurulu"
          title="İstişare Kurulu"
          tone="teal"
          people={istisareKurulu}
          numbered
        />
      </div>

      <Fork columns={3} />

      <div className="org-row" style={{ "--org-cols": 3 } as React.CSSProperties}>
        <Panel id="finans" title="Finans Kurulu" tone="accent" people={finansKurulu} />
        <Panel id="gorevler" title="Diğer Görevler" tone="accent" people={digerGorevler} />
        <Panel
          id="kollar"
          title="Kadın ve Gençlik Kolları"
          tone="gold"
          people={[...kadinKollari, ...genclikKollari]}
        />
      </div>

      <figcaption>
        Derneğin resmî yönetim kurulu şemasından çizilmiştir; kurul üyeliklerinde
        değişiklik olduğunda güncellenir.{" "}
        <a href="/assets/yonetim-semasi.jpg" target="_blank" rel="noreferrer">
          Taranmış aslını görüntüleyin
        </a>
        .
      </figcaption>
    </figure>
  );
}
