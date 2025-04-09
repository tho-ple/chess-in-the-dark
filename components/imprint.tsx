import React from 'react';

type Props = {
    name: string;
    adresse: string;
    plzOrt: string;
    land: string;
    telefon?: string;
    email: string;
    erlaubnisText?: boolean;
    haftungsausschlussLinks?: boolean;
    ihreRechteText?: boolean;
};

export function Impressum({ name, adresse, plzOrt, land, telefon, email, erlaubnisText, haftungsausschlussLinks, ihreRechteText }: Props) {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Impressum</h1>
            <p className="text-sm text-gray-600 mb-2">Informationspflicht laut §5 E-Commerce Gesetz, §63 Gewerbeordnung, §14 Unternehmensgesetzbuch und Offenlegungspflicht laut §25 Mediengesetz</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">{name}</h2>
            <p className="text-base text-gray-700 mb-1">{adresse}</p>
            <p className="text-base text-gray-700 mb-1">{plzOrt}</p>
            <p className="text-base text-gray-700 mb-2">{land}</p>
            {telefon && <p className="text-base text-gray-700 mb-1">Tel: {telefon}</p>}
            <p className="text-base text-gray-700 mb-4">E-Mail: {email}</p>

            {erlaubnisText && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Erlaubnis für unaufgeforderte Zusendungen</h3>
                    <p className="text-base text-gray-800 mb-4">
                        Sie haben die temporäre Erlaubnis uns unaufgeforderte Zusendung in Form von Werbung Ihrer Produkte, Kooperationsanfragen oder Partnerschaftsanfragen zuzusenden. Dafür wurde ein eigenes E-Mail Postfach eingerichtet, welches Sie unter {email} erreichen können. Mit diesem Postfach ist eine temporäre Einwilligung des Empfängers zur Zusendung von Informationsmaterial bis auf Widerruf gestattet. Ein etwaiger Widerruf hat zur Folge, dass keine weiteren Zusendungen oder Kontaktaufnahmen ab dem Zeitpunkt der Bekanntgabe erfolgen dürfen.
                    </p>
                </div>
            )}

            {haftungsausschlussLinks && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Haftungsausschluss für ausgehende Links</h3>
                    <p className="text-base text-gray-800 mb-4">
                        Diese Webpräsenz enthält, so wie viele andere Webseiten ebenfalls, so genannte Links auf andere, fremde Webpräsenzen und Inhalte. Das wird als Urgedanke des Internets und des weltweiten Informationsaustauschs als gang und gäbe angesehen. Rechtlich und technisch gesehen haben wir als Betreiber unserer Webseite keinen Einfluss auf die Gestaltung sowie den Inhalt der verlinkten Webpräsenzen. Aus diesem Grund können wir zu keinem Zeitpunkt für diese Webpräsenzen in irgendeiner Art und Weise Haftung oder Gewähr übernehmen, da diese im Verantwortungsbereich des jeweiligen Betreibers angesiedelt ist.                    </p>
                    <p className="text-base text-gray-800 mb-4">
                        Zum Zeitpunkt der Verlinkung wurden die fremden Inhalte auf Funktionalität, rechtswidrige Inhalte sowie uns möglich auf Schadsoftware überprüft. Als Indiz finden Sie bei einigen Links einen Datumsstempel der auf den Zeitpunkt der gesetzten Verlinkung hinweist. Nichts desto trotz sind wir bemüht unsere Besucher vor rechtswidrigen Inhalten und Schadsoftware zu schützen weshalb wir stichprobenartig die gesetzten Links in wiederkehrenden Intervallen untersuchen. Bei etwaigen Rechtsverletzungen werden die gesetzten Links selbstverständlich umgehend entfernt.
                    </p>
                    <p className="text-base text-gray-800 mb-4">
                        Sollten Sie einen derartigen Link vor unserer Überprüfung gefunden haben, so bitten wir um umgehende Benachrichtigung an die im Impressum angezeigten Kontaktdaten. Bitte übermitteln Sie uns dabei den Link unserer Webseite die den fragwürdigen Verweis enthält, sowie die Art der Kennzeichnung (a) rechtwidriger Inhalt, b) Schadsoftware oder c) inaktiver Inhalt bzw. Verweis).                    </p>
                </div>
            )}

            {ihreRechteText && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Ihre Rechte</h3>
                    <p className="text-base text-gray-800 mb-4">
                        Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der oben genannten E-Mail-Adresse oder Ihrer Datenschutzbehörde beschweren.</p>


                </div>

            )}
            <div>
                <p className="text-xs text-gray-400 text-right">
                    Generiert mithilfe des kostenlosen und einfachen Impressum Generator von idigIT e.U.
                </p>
            </div>
        </div>
    );
};

export default Impressum;

