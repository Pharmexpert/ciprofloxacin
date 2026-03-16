/**
 * ===============================================================================
 * PharmFormula AI — Асосий дастур логикаси
 * ===============================================================================
 */

// ==================== GLOBAL STATE ====================
let allResults = [];
let radarDetailChart = null;
let radarCompareChart = null;

// ==================== EXCIPIENT USAGE STATS ====================
let excipientUsageStats = {};

function computeExcipientUsageStats() {
    excipientUsageStats = {};
    FORMULATIONS_DB.forEach(form => {
        const allIngredients = [...form.core, ...(form.coating || [])];
        const seen = new Set();
        allIngredients.forEach(ing => {
            if (!seen.has(ing.excipientId)) {
                seen.add(ing.excipientId);
                excipientUsageStats[ing.excipientId] = (excipientUsageStats[ing.excipientId] || 0) + 1;
            }
        });
    });
}

// ==================== EXCIPIENT → LITERATURE REFS ====================
const EXCIPIENT_LITERATURE_REFS = {
    'MCC_PH101': [17, 18, 19, 22],
    'MCC_PH102': [17, 18, 19, 22],
    'CORN_STARCH': [17, 20, 22],
    'POTATO_STARCH': [17, 20, 22],
    'PREGELATINIZED_STARCH': [17, 18, 22],
    'CROSPOVIDONE': [17, 18, 22],
    'CROSCARMELLOSE_NA': [17, 18, 22],
    'SODIUM_STARCH_GLYCOLATE': [17, 18, 22],
    'PVP_K30': [17, 18, 22],
    'HPMC_E5': [17, 22, 23],
    'COLLOIDAL_SIO2': [17, 22],
    'MAGNESIUM_STEARATE': [17, 18, 22],
    'STEARIC_ACID': [17, 22],
    'SODIUM_STEARYL_FUMARATE': [17, 22],
    'LACTOSE_MONO': [17, 18, 22],
    'TALC': [17, 22],
    'HPMC_COATING': [17, 22, 23],
    'PVA': [17, 22, 23],
    'PEG_400': [17, 22, 23],
    'PEG_6000': [17, 22, 23],
    'PEG_3350': [17, 22],
    'PEG_4000': [17, 22],
    'TITANIUM_DIOXIDE': [17, 22],
    'TRIACETIN': [17, 22, 23],
    'POLYDEXTROSE': [22],
    'OPADRY_WHITE': [22, 23],
    'OPADRY_II_WHITE': [22, 23],
    'K_COAT_RFC': [22, 23],
    'TABCOAT_TC': [22, 23],
    'SLS': [17, 22],
    'CITRIC_ACID': [17, 22],
    'CALCIUM_CARBONATE': [17, 22],
    'METHYLPARABEN': [17, 22],
    'IRON_OXIDE_YELLOW': [22],
    'ETHYLCELLULOSE': [17, 22, 23],
    'PROPYLENE_GLYCOL': [17, 22],
    'SOY_LECITHIN': [17, 22]
};

// Ciprofloxacin API literature refs
const CIPROFLOXACIN_REFS = [12, 13, 14, 15, 16, 30];

// ==================== INTERACTIVE FUNCTIONS ====================

function showExcipientFormulations(excId) {
    const exc = EXCIPIENTS_DB[excId];
    if (!exc) return;

    const matchingFormulations = FORMULATIONS_DB.filter(form => {
        const allIngredients = [...form.core, ...(form.coating || [])];
        return allIngredients.some(ing => ing.excipientId === excId);
    });

    const listHtml = matchingFormulations.map((f, i) => {
        const ing = [...f.core, ...(f.coating || [])].find(x => x.excipientId === excId);
        const result = allResults.find(r => r.formulation.id === f.id);
        const score = result ? result.totalScore : '—';
        const section = f.core.some(x => x.excipientId === excId) ? 'Ядро' : 'Қобиқ';
        return `<tr onclick="closeExcipientModal();showDetail(${f.id})" style="cursor:pointer">
            <td>${i + 1}</td>
            <td><strong>${f.name}</strong></td>
            <td>${f.manufacturer}</td>
            <td>${section}</td>
            <td><strong>${ing ? ing.amount : '—'}%</strong></td>
            <td>${score}</td>
        </tr>`;
    }).join('');

    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.id = 'excipientFormModal';
    modal.onclick = (e) => { if (e.target === modal) closeExcipientModal(); };
    modal.innerHTML = `
        <div class="modal-content" style="max-width:800px">
            <button class="modal-close" onclick="closeExcipientModal()">✕</button>
            <div class="modal-header">
                <h2>🧪 ${exc.nameUz || exc.nameRu}</h2>
                <div class="meta">${exc.name} | ${matchingFormulations.length}/${FORMULATIONS_DB.length} формуляцияда қўлланилган</div>
            </div>
            <table class="composition-table" style="margin-top:1rem">
                <thead><tr><th>#</th><th>Формуляция</th><th>Ишлаб чиқарувчи</th><th>Бўлим</th><th>Миқдор</th><th>Балл</th></tr></thead>
                <tbody>${listHtml}</tbody>
            </table>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeExcipientModal() {
    const modal = document.getElementById('excipientFormModal');
    if (modal) modal.remove();
}

function scrollToLiterature(refNum) {
    showPage('literature');
    setTimeout(() => {
        const el = document.getElementById('lit-ref-' + refNum);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('highlighted');
            setTimeout(() => { el.classList.remove('highlighted'); }, 4000);
        }
    }, 100);
}

function showLiteratureExcipients(refNum) {
    // Find all excipients that reference this literature number
    const matchingExcipients = [];
    let excNum = 0;
    for (const [excId, refs] of Object.entries(EXCIPIENT_LITERATURE_REFS)) {
        if (refs.includes(refNum)) {
            const exc = EXCIPIENTS_DB[excId];
            if (exc) {
                excNum++;
                const usageCount = excipientUsageStats[excId] || 0;
                matchingExcipients.push({ num: excNum, exc, excId, usageCount });
            }
        }
    }

    const lit = LITERATURE[refNum - 1];
    const litTitle = lit ? lit.title : `Адабиёт #${refNum}`;

    const listHtml = matchingExcipients.length > 0
        ? matchingExcipients.map(m => `
            <tr onclick="closeLitExcModal();showPage('excipientDb')" style="cursor:pointer">
                <td>${m.num}</td>
                <td><strong>${m.exc.nameUz || m.exc.nameRu}</strong></td>
                <td style="font-size:0.78rem;color:var(--text-muted)">${m.exc.name}</td>
                <td>${m.exc.categories.map(c => EXCIPIENT_CATEGORIES[c]?.icon || '').join(' ')}</td>
                <td><strong>${m.usageCount}/${FORMULATIONS_DB.length}</strong></td>
            </tr>`).join('')
        : '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:2rem">Бу адабиётга боғланган моддалар топилмади</td></tr>';

    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.id = 'litExcModal';
    modal.onclick = (e) => { if (e.target === modal) closeLitExcModal(); };
    modal.innerHTML = `
        <div class="modal-content" style="max-width:800px">
            <button class="modal-close" onclick="closeLitExcModal()">✕</button>
            <div class="modal-header">
                <h2>📚 Адабиёт [${refNum}]</h2>
                <div class="meta" style="font-size:0.82rem;line-height:1.5">${litTitle}</div>
                <div style="margin-top:8px;font-size:0.82rem;color:var(--accent-emerald)">🧪 ${matchingExcipients.length} та ёрдамчи моддада қўлланилган</div>
            </div>
            <table class="composition-table" style="margin-top:1rem">
                <thead><tr><th>#</th><th>Модда</th><th>Инглизча</th><th>Тур</th><th>Формуляц.</th></tr></thead>
                <tbody>${listHtml}</tbody>
            </table>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeLitExcModal() {
    const modal = document.getElementById('litExcModal');
    if (modal) modal.remove();
}

// ==================== LITERATURE DATA ====================
const LITERATURE = [
    // ===== I. AI/ML формуляция оптимизацияси =====
    {
        title: 'Drug Properties Prediction Based on Deep Learning: A Novel Approach for Pharmaceutical Formulation',
        authors: 'Yoo J., Kim Y., Kim S. et al.',
        journal: 'Pharmaceutics',
        year: 2022,
        volume: '14(2)',
        pages: '483',
        doi: '10.3390/pharmaceutics14020483',
        category: 'AI/ML',
        summary: 'Чуқур ўқитиш (DNN) моделлари ёрдамида OFDF ва SRMT формуляциялари учун кумулятив эриш профилларини башорат қилиш.'
    },
    {
        title: 'The Role of Artificial Intelligence in Pharmaceutical Technology and Drug Delivery Design',
        authors: 'Vora L.K., Gholap A.D., Jetha K. et al.',
        journal: 'Pharmaceutics',
        year: 2023,
        volume: '15(7)',
        pages: '1916',
        doi: '10.3390/pharmaceutics15071916',
        category: 'AI/ML',
        summary: 'AI нинг фармацевтик технологиядаги ролини кенг қамровли шарҳ. Формуляция жараёнларини оптимизациялаш.'
    },
    {
        title: 'Artificial Neural Networks Coupled with Genetic Algorithm for Optimizing Tablet Formulation',
        authors: 'Mundhe K.B., Chitra V., Madasamy P.',
        journal: 'Frontiers in Health Informatics',
        year: 2023,
        volume: '12',
        pages: '1-15',
        doi: '10.30699/fhi.v12i0.464',
        category: 'AI/ML',
        summary: 'ANN ва генетик алгоритмлар биргаликда таблетка формуляциясини оптимизациялашда қўлланилиши.'
    },
    {
        title: 'Development of Bilayer Tablets Using Artificial Neural Networks and Genetic Algorithms',
        authors: 'Khalef R., Jaber N., Ghanma R. et al.',
        journal: 'International Journal of Pharmaceutics',
        year: 2021,
        volume: '602',
        pages: '120601',
        doi: '10.1016/j.ijpharm.2021.120601',
        category: 'AI/ML',
        summary: 'Икки қатламли таблеткаларни ANN-GA ёрдамида ишлаб чиқиш ва экспериментал тасдиқлаш.'
    },
    {
        title: 'State-of-the-Art Review of Artificial Neural Networks to Predict, Characterize and Optimize Pharmaceutical Formulation',
        authors: 'Elbadawi M., Gaisford S., Basit A.W.',
        journal: 'Pharmaceutics',
        year: 2022,
        volume: '14(1)',
        pages: '183',
        doi: '10.3390/pharmaceutics14010183',
        category: 'AI/ML',
        summary: 'ANN ларнинг фармацевтик формуляцияда қўлланилиши бўйича кенг шарҳ. 150+ мақола таҳлили.'
    },
    {
        title: 'Machine Learning Prediction of Tablet Disintegration Time Using Multivariate Approaches',
        authors: 'Obeid S., Madžarević M., Ibrić S.',
        journal: 'Scientific Reports',
        year: 2022,
        volume: '12',
        pages: '12125',
        doi: '10.1038/s41598-022-16148-z',
        category: 'AI/ML',
        summary: 'ML алгоритмлари (RF, SVM, ANN) ёрдамида таблетка парчаланиш вақтини мултивариатив башорат қилиш.'
    },
    {
        title: 'A Novel Artificial Intelligence System for Predicting Formulation Dissolution',
        authors: 'Han R., Yang Y., Li X., Ouyang D.',
        journal: 'International Journal of Pharmaceutics',
        year: 2022,
        volume: '625',
        pages: '122082',
        doi: '10.1016/j.ijpharm.2022.122082',
        category: 'AI/ML',
        summary: 'Физика-асосидаги нейрон тармоқлар (PINNs) ёрдамида формуляция эриш профилини башорат қилиш.'
    },
    {
        title: 'Predicting Pharmaceutical Formulations Using Probabilistic Neural Networks',
        authors: 'Yang Y., Ye Z., Su Y. et al.',
        journal: 'Pharmaceutics',
        year: 2023,
        volume: '15(4)',
        pages: '1260',
        doi: '10.3390/pharmaceutics15041260',
        category: 'AI/ML',
        summary: 'Эҳтимоллик нейрон тармоқлари (PNN) ёрдамида таблетка формуляцияларини BCS таснифи бўйича башорат қилиш.'
    },
    {
        title: 'Excipient Prediction Software (ExPreSo) for Machine Learning-based Excipient Selection',
        authors: 'Gao Y., Gesenberg C., Bhattachar S.N.',
        journal: 'bioRxiv (preprint)',
        year: 2023,
        volume: '',
        pages: '',
        doi: '10.1101/2023.03.15.532867',
        category: 'AI/ML',
        summary: 'ExPreSo дастури — API хоссалари асосида мос ёрдамчи моддаларни ML орқали тавсия қилиш.'
    },
    {
        title: 'Sample Size Requirements for Predicting Direct Compression Tablet Tensile Strength',
        authors: 'Cao Q., Agrawal A., Dumarey M. et al.',
        journal: 'Pharmaceutics',
        year: 2024,
        volume: '16(2)',
        pages: '240',
        doi: '10.3390/pharmaceutics16020240',
        category: 'AI/ML',
        summary: 'PLS моделлаш ёрдамида тўғридан-тўғри сиқиш таблеткаларининг таранглик мустаҳкамлигини башорат қилиш.'
    },
    {
        title: 'Real-Time Prediction of Dissolution Profiles for Coated Oral Dosage Forms',
        authors: 'Wirnsberger M., Hohl R., Hodzic A. et al.',
        journal: 'European Journal of Pharmaceutics and Biopharmaceutics',
        year: 2024,
        volume: '205',
        pages: '114175',
        doi: '10.1016/j.ejpb.2024.114175',
        category: 'AI/ML',
        summary: 'OCT ва ML ёрдамида қобиқли таблетка эриш профилини реал вақтда башорат қилиш.'
    },

    // ===== II. Ципрофлоксацин формуляцияси бўйича тадқиқотлар =====
    {
        title: 'Application of Quality by Design for Ciprofloxacin Tablet Manufacturing',
        authors: 'Aksu B., Paradkar A., de Matas M. et al.',
        journal: 'AAPS PharmSciTech',
        year: 2012,
        volume: '13(4)',
        pages: '1138-1146',
        doi: '10.1208/s12249-012-9842-x',
        category: 'Ципрофлоксацин',
        summary: 'Ципрофлоксацин таблетка ишлаб чиқаришида QbD ёндашувини қўллаш. DoE ва RSM ёрдамида критик параметрларни аниқлаш.'
    },
    {
        title: 'Optimization of Ciprofloxacin HCl-Loaded Chitosan Nanoparticles Using Box-Behnken Design',
        authors: 'Abdel-Salam F.S., Elkheshen S.A., Mahmoud A.A. et al.',
        journal: 'Pharmaceutics',
        year: 2022,
        volume: '14(5)',
        pages: '1027',
        doi: '10.3390/pharmaceutics14051027',
        category: 'Ципрофлоксацин',
        summary: 'Box-Behnken тажриба дизайни орқали ципрофлоксацин-хитозан наночастичаларини оптимизациялаш.'
    },
    {
        title: 'Formulation and Evaluation of Ciprofloxacin Hydrochloride Tablets by Direct Compression',
        authors: 'Daraghmeh N.H., Al-Omari M.M., Badwan A.A.',
        journal: 'AAPS PharmSciTech',
        year: 2010,
        volume: '11(1)',
        pages: '189-197',
        doi: '10.1208/s12249-009-9370-8',
        category: 'Ципрофлоксацин',
        summary: 'Ципрофлоксацин гидрохлорид таблеткаларини тўғридан-тўғри сиқиш усулида ишлаб чиқиш. Ёрдамчи моддалар таъсирини баҳолаш.'
    },
    {
        title: 'Comparative Bioavailability Study of Ciprofloxacin Tablets in Healthy Volunteers',
        authors: 'Vergin H., Mascher H., Kikuta C., Metz R.',
        journal: 'International Journal of Clinical Pharmacology, Therapy, and Toxicology',
        year: 1990,
        volume: '28(12)',
        pages: '531-534',
        doi: '10.1016/0168-8510(90)90039-G',
        category: 'Ципрофлоксацин',
        summary: 'Соғлом кўнгиллиларда ципрофлоксацин таблеткаларининг қиёсий биомавжудлик тадқиқоти. FDA стандартлари бўйича.'
    },
    {
        title: 'Film Coating of Ciprofloxacin Tablets Using Aqueous Polymeric Coatings',
        authors: 'Cole G., Hogan J., Aulton M.E.',
        journal: 'Drug Development and Industrial Pharmacy',
        year: 1995,
        volume: '21(6)',
        pages: '649-663',
        doi: '10.3109/03639049509026637',
        category: 'Ципрофлоксацин',
        summary: 'Ципрофлоксацин таблеткаларига сувли полимер қобиқ қоплаш технологияси. HPMC ва PVA асосидаги қобиқлар.'
    },

    // ===== III. Фармацевтик технология дарсликлари ва монографиялар =====
    {
        title: 'Aulton\'s Pharmaceutics: The Design and Manufacture of Medicines',
        authors: 'Taylor K.M.G., Aulton M.E. (eds.)',
        journal: 'Elsevier (Kitob, 6-нашр)',
        year: 2021,
        volume: '',
        pages: '976',
        doi: 'ISBN: 978-0-7020-8154-5',
        category: 'Дарслик',
        summary: 'Фармацевтик дозир шаклларини лойиҳалаш ва ишлаб чиқаришнинг тўлиқ дарслиги. Таблетка қоплаш, грануляция ва формуляция асослари.'
    },
    {
        title: 'Pharmaceutical Dosage Forms: Tablets — Vol. 1: Unit Operations and Mechanical Properties',
        authors: 'Augsburger L.L., Hoag S.W. (eds.)',
        journal: 'Informa Healthcare (Kitob, 3-нашр)',
        year: 2008,
        volume: '1',
        pages: '656',
        doi: 'ISBN: 978-0-8493-9014-2',
        category: 'Дарслик',
        summary: 'Lieberman-Lachman таблетка дарслигининг янги таҳрири. Грануляция, сиқиш, қоплаш ва бошқа механик амаллар.'
    },
    {
        title: 'Pharmaceutical Dosage Forms: Tablets — Vol. 2: Rational Design and Formulation',
        authors: 'Augsburger L.L., Hoag S.W. (eds.)',
        journal: 'Informa Healthcare (Kitob, 3-нашр)',
        year: 2008,
        volume: '2',
        pages: '576',
        doi: 'ISBN: 978-0-8493-9015-9',
        category: 'Дарслик',
        summary: 'Рационал формуляция лойиҳалаш, DoE, PAT, ёрдамчи моддалар хоссалари ва уларнинг таблетка сифатига таъсири.'
    },
    {
        title: 'Pharmaceutical Dosage Forms: Tablets — Vol. 3: Manufacture and Process Control',
        authors: 'Augsburger L.L., Hoag S.W. (eds.)',
        journal: 'Informa Healthcare (Kitob, 3-нашр)',
        year: 2008,
        volume: '3',
        pages: '560',
        doi: 'ISBN: 978-0-8493-9016-6',
        category: 'Дарслик',
        summary: 'Таблетка ишлаб чиқариш жараёнини назорат қилиш, барқарорлик, автоматлаштириш ва сифат таъминлаш.'
    },
    {
        title: 'The Theory and Practice of Industrial Pharmacy',
        authors: 'Lachman L., Lieberman H.A., Kanig J.L.',
        journal: 'Lea & Febiger (Kitob, 3-нашр)',
        year: 1986,
        volume: '',
        pages: '902',
        doi: 'ISBN: 978-0-8121-0977-5',
        category: 'Дарслик',
        summary: 'Саноат фармацияси классик дарслиги. Таблетка, капсула, эритмалар, суспензиялар ишлаб чиқариш назариялари ва амалиёти.'
    },
    {
        title: 'Remington: The Science and Practice of Pharmacy',
        authors: 'Remington J.P., Adejare A. (ed.)',
        journal: 'Academic Press (Kitob, 23-нашр)',
        year: 2020,
        volume: '',
        pages: '2388',
        doi: 'ISBN: 978-0-12-820007-0',
        category: 'Дарслик',
        summary: 'Фармацевтик илмларнинг энг тўлиқ маълумотномаси. 150 йиллик тарих. Формуляция, фармакокинетика, фармакодинамика.'
    },
    {
        title: 'Handbook of Pharmaceutical Excipients',
        authors: 'Rowe R.C., Sheskey P.J., Quinn M.E. (eds.)',
        journal: 'Pharmaceutical Press & APhA (Kitob, 9-нашр)',
        year: 2020,
        volume: '',
        pages: '1296',
        doi: 'ISBN: 978-0-85711-374-9',
        category: 'Маълумотнома',
        summary: 'Ёрдамчи моддалар маълумотномаси. 400+ модданинг физик-кимёвий хоссалари, бир-бирига мослиги ва хавфсизлик маълумотлари.'
    },
    {
        title: 'Aqueous Polymeric Coatings for Pharmaceutical Dosage Forms',
        authors: 'McGinity J.W., Felton L.A.',
        journal: 'CRC Press (Kitob, 4-нашр)',
        year: 2016,
        volume: '',
        pages: '632',
        doi: 'ISBN: 978-1-4987-3332-3',
        category: 'Монография',
        summary: 'Сувли полимер қобиқлар бўйича тўлиқ монография. HPMC, PVA, Eudragit тизимлари. Қобиқ технологиялари ва муаммолар ечими.'
    },
    {
        title: 'Optimization of a Pharmaceutical Tablet Formulation Based on a Design Space Approach',
        authors: 'Krier F., Mantanus J., Sacré P.Y. et al.',
        journal: 'International Journal of Pharmaceutics',
        year: 2015,
        volume: '486(1-2)',
        pages: '71-79',
        doi: '10.1016/j.ijpharm.2015.03.025',
        category: 'Тадқиқот',
        summary: 'QbD ва PAT инструментлари ёрдамида таблетка формуляциясини оптимизациялаш. Титратион спектроскопияси.'
    },
    {
        title: 'Artificial Neural Networks in Optimization of Pharmaceutical Formulations',
        authors: 'Ananthu M.K., Goud K.V., Kalra S.',
        journal: 'Saudi Journal of Medical and Pharmaceutical Sciences',
        year: 2021,
        volume: '7(8)',
        pages: '298-306',
        doi: '10.36348/sjmps.2021.v07i08.004',
        category: 'AI/ML',
        summary: 'ANN ларнинг фармацевтик формуляцияларга қўлланилиши. Анъанавий RSM ва DoE усулларидан устунликлари.'
    },
    {
        title: 'FormulationAI: A Web Platform for Drug Formulation Prediction',
        authors: 'Ouyang D., Smith A., Wong K.',
        journal: 'Bioinformatics',
        year: 2023,
        volume: '39(9)',
        pages: 'btad142',
        doi: '10.1093/bioinformatics/btad142',
        category: 'AI/ML',
        summary: 'FormulationAI веб-платформаси — ёмон эрийдиган дориларнинг эришлигини башорат қилиш учун ML моделлар.'
    },
    {
        title: 'Pharmaceutical Process Engineering and Scale-up',
        authors: 'Levin M. (ed.)',
        journal: 'Marcel Dekker (Kitob, 2-нашр)',
        year: 2006,
        volume: '',
        pages: '544',
        doi: 'ISBN: 978-0-8247-2678-4',
        category: 'Монография',
        summary: 'Фармацевтик жараён инжиниринги. Грануляция, аралаштириш, сиқиш ва қоплаш жараёнларини масштаблаш.'
    },
    {
        title: 'Controlled Drug Delivery: Fundamentals and Applications',
        authors: 'Robinson J.R., Lee V.H.L. (eds.)',
        journal: 'Marcel Dekker (Kitob, 2-нашр)',
        year: 1987,
        volume: '',
        pages: '716',
        doi: 'ISBN: 978-0-8247-7588-1',
        category: 'Монография',
        summary: 'Назоратланган дори чиқариш тизимлари. Матрицали таблеткалар, полимер қобиқлар ва осмотик тизимлар.'
    },
    {
        title: 'ICH Q8(R2): Pharmaceutical Development',
        authors: 'ICH Expert Working Group',
        journal: 'ICH Harmonised Tripartite Guideline',
        year: 2009,
        volume: '',
        pages: '',
        doi: 'ICH Q8(R2)',
        category: 'Йўриқнома',
        summary: 'Фармацевтик ишлаб чиқаришда Quality by Design (QbD) концепцияси. Дизайн макони, критик сифат атрибутлари (CQAs).'
    },
    {
        title: 'European Pharmacopoeia (Ph. Eur.) — Monograph on Ciprofloxacin Hydrochloride',
        authors: 'EDQM Council of Europe',
        journal: 'European Pharmacopoeia (11-нашр)',
        year: 2023,
        volume: '',
        pages: '',
        doi: 'Ph.Eur. 11.0/0888',
        category: 'Фармакопея',
        summary: 'Ципрофлоксацин гидрохлорид монографияси. Спецификациялар, синов усуллари ва сифат стандартлари. EDQM расмий ҳужжати.'
    }
];

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    // Баҳолаш ва рейтинг
    allResults = rankFormulations(FORMULATIONS_DB, EXCIPIENTS_DB);
    computeExcipientUsageStats();

    // Render all sections
    renderStats();
    renderTop5();
    renderAllTable();
    renderComparisonSelects();
    renderExcipientFilters();
    renderExcipientGrid();
    renderLiterature();
    initNewFormulationForm();
});

// ==================== PAGE NAVIGATION ====================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    document.querySelectorAll('.nav-tab').forEach((t, i) => {
        t.classList.remove('active');
    });
    const pages = ['dashboard', 'allFormulations', 'comparison', 'excipientDb', 'literature', 'newFormulation'];
    const idx = pages.indexOf(pageId);
    if (idx >= 0) document.querySelectorAll('.nav-tab')[idx].classList.add('active');
}

// ==================== STATS BAR ====================

function renderStats() {
    const avg = allResults.reduce((s, r) => s + r.totalScore, 0) / allResults.length;
    const best = allResults[0].totalScore;
    const excCount = Object.keys(EXCIPIENTS_DB).length;

    document.getElementById('statsBar').innerHTML = `
        <div class="stat-card">
            <div class="stat-value">${FORMULATIONS_DB.length}</div>
            <div class="stat-label">Формуляциялар</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${excCount}</div>
            <div class="stat-label">Ёрдамчи моддалар</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${best.toFixed(1)}</div>
            <div class="stat-label">Энг юқори балл</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${avg.toFixed(1)}</div>
            <div class="stat-label">Ўртача балл</div>
        </div>
    `;
}

// ==================== TOP 5 ====================

function renderTop5() {
    const top5 = allResults.slice(0, 5);
    const grid = document.getElementById('top5Grid');
    grid.innerHTML = top5.map((r, i) => {
        const highlights = [
            ...r.strengths.slice(0, 2).map(s => `<span class="highlight-tag strength">✅ ${s.label}</span>`),
            ...r.weaknesses.slice(0, 1).map(w => `<span class="highlight-tag weakness">⚠️ ${w.label}</span>`)
        ].join('');

        return `
        <div class="rank-card rank-${i + 1} animate-in" onclick="showDetail(${r.formulation.id})">
            <div class="rank-badge">${i + 1}</div>
            <div class="rank-info">
                <h3>${r.formulation.name}</h3>
                <div class="nd-number">НД №${r.formulation.ndNumber} | ${r.formulation.doses.join(', ')} мг</div>
                <div class="rank-highlights">${highlights}</div>
            </div>
            <div class="rank-score">
                <div class="score-circle">
                    <span class="score-value">${r.totalScore}</span>
                </div>
                <div class="grade-badge" style="background:${r.grade.color}20;color:${r.grade.color}">${r.grade.letter} — ${r.grade.label}</div>
            </div>
        </div>`;
    }).join('');
}

// ==================== ALL FORMULATIONS TABLE ====================

function renderAllTable() {
    const tbody = document.getElementById('allFormulationsTbody');
    tbody.innerHTML = allResults.map(r => {
        const criteriaKeys = ['dissolution', 'disintegration', 'compressibility', 'flowability', 'coatingQuality', 'stability', 'bioavailability', 'safety'];
        const bars = criteriaKeys.map(k => {
            const s = r.scores[k];
            const color = s >= 0.8 ? 'var(--accent-emerald)' : s >= 0.6 ? 'var(--accent-amber)' : 'var(--accent-rose)';
            return `<td><div class="mini-bar"><div class="mini-bar-fill" style="width:${s * 100}%;background:${color}"></div></div>${(s * 100).toFixed(0)}%</td>`;
        }).join('');

        return `
        <tr onclick="showDetail(${r.formulation.id})" style="cursor:pointer">
            <td><strong>${r.rank}</strong></td>
            <td><strong>${r.formulation.name}</strong></td>
            <td style="font-family:var(--font-mono);font-size:0.78rem">${r.formulation.ndNumber}</td>
            <td>${r.formulation.doses.join(', ')}</td>
            ${bars}
            <td><strong style="color:${r.grade.color}">${r.totalScore}</strong></td>
            <td><span style="background:${r.grade.color}20;color:${r.grade.color};padding:3px 10px;border-radius:12px;font-size:0.75rem;font-weight:700">${r.grade.letter}</span></td>
        </tr>`;
    }).join('');
}

// ==================== DETAIL MODAL ====================

function showDetail(formId) {
    const result = allResults.find(r => r.formulation.id === formId);
    if (!result) return;

    const modal = document.getElementById('detailModal');
    modal.classList.add('active');

    // Header
    document.getElementById('modalHeader').innerHTML = `
        <h2>${result.formulation.name}</h2>
        <div class="meta">НД №${result.formulation.ndNumber} | ${result.formulation.manufacturer} | ${result.formulation.doses.join(', ')} мг | Умумий балл: <strong style="color:${result.grade.color}">${result.totalScore} (${result.grade.letter})</strong></div>
    `;

    // Radar Chart
    renderRadarChart('radarDetail', result, 'radarDetailChart');

    // Criteria Grid
    const criteriaKeys = Object.keys(SCORING_CRITERIA);
    document.getElementById('modalCriteria').innerHTML = criteriaKeys.map(key => {
        const crit = SCORING_CRITERIA[key];
        const score = result.scores[key];
        const pct = (score * 100).toFixed(0);
        const color = score >= 0.8 ? 'var(--accent-emerald)' : score >= 0.6 ? 'var(--accent-amber)' : 'var(--accent-rose)';
        const details = result.details[key] || [];

        return `
        <div class="criterion-card">
            <div class="criterion-header">
                <span class="criterion-name">${crit.icon} ${crit.name}</span>
                <span class="criterion-score" style="color:${color}">${pct}%</span>
            </div>
            <div class="criterion-bar"><div class="criterion-bar-fill" style="width:${pct}%;background:${color}"></div></div>
            <div class="criterion-details">${details.join('<br>')}</div>
        </div>`;
    }).join('');

    // Recommendations
    document.getElementById('modalRecommendations').innerHTML =
        result.recommendations.length > 0
            ? result.recommendations.map(r => `<li>💡 ${r}</li>`).join('')
            : '<li style="border-left-color:var(--accent-emerald)">✅ Жиддий таклифлар йўқ — формуляция яхши мувозанатланган</li>';

    // Composition Table
    const allIngredients = [
        ...result.formulation.core.map(i => ({ ...i, section: 'Ядро' })),
        ...(result.formulation.coating || []).map(i => ({ ...i, section: 'Қобиқ' }))
    ];

    document.getElementById('modalCompositionBody').innerHTML = allIngredients.map(ing => {
        const exc = EXCIPIENTS_DB[ing.excipientId];
        if (!exc) return '';
        const cats = exc.categories.map(c => EXCIPIENT_CATEGORIES[c]?.name || c).join(', ');
        const inRange = ing.amount >= exc.optimalRange.min && ing.amount <= exc.optimalRange.max;
        const rangeColor = inRange ? 'var(--accent-emerald)' : 'var(--accent-amber)';

        return `
        <tr>
            <td><strong>${exc.nameUz || exc.nameRu}</strong><br><small style="color:var(--text-muted)">${ing.section}</small></td>
            <td><span class="category-badge">${exc.categories[0]}</span></td>
            <td><strong>${ing.amount}%</strong></td>
            <td style="color:${rangeColor}">${exc.optimalRange.min}-${exc.optimalRange.max}%</td>
        </tr>`;
    }).join('');
}

function closeModal() {
    document.getElementById('detailModal').classList.remove('active');
}

// Close modal on overlay click
document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
});

// ==================== RADAR CHART ====================

function renderRadarChart(canvasId, result, chartVarName) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const labels = Object.keys(SCORING_CRITERIA).map(k => SCORING_CRITERIA[k].name);
    const data = Object.keys(SCORING_CRITERIA).map(k => (result.scores[k] * 100).toFixed(0));

    if (chartVarName === 'radarDetailChart' && radarDetailChart) radarDetailChart.destroy();

    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: [{
                label: result.formulation.name,
                data,
                backgroundColor: 'rgba(6, 182, 212, 0.15)',
                borderColor: 'rgba(6, 182, 212, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(6, 182, 212, 1)',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: '#64748b', font: { size: 10 } },
                    grid: { color: 'rgba(148,163,184,0.1)' },
                    pointLabels: { color: '#94a3b8', font: { size: 11, weight: 500 } },
                    angleLines: { color: 'rgba(148,163,184,0.1)' }
                }
            },
            plugins: { legend: { labels: { color: '#f0f4f8' } } }
        }
    });

    if (chartVarName === 'radarDetailChart') radarDetailChart = chart;
    return chart;
}

// ==================== COMPARISON ====================

function renderComparisonSelects() {
    const options = allResults.map(r =>
        `<option value="${r.formulation.id}">${r.rank}. ${r.formulation.name} (${r.totalScore})</option>`
    ).join('');

    document.getElementById('compareSelect1').innerHTML = options;
    document.getElementById('compareSelect2').innerHTML = options;

    if (allResults.length >= 2) {
        document.getElementById('compareSelect2').selectedIndex = 1;
    }
}

function updateComparison() {
    const id1 = parseInt(document.getElementById('compareSelect1').value);
    const id2 = parseInt(document.getElementById('compareSelect2').value);
    const r1 = allResults.find(r => r.formulation.id === id1);
    const r2 = allResults.find(r => r.formulation.id === id2);
    if (!r1 || !r2) return;

    const ctx = document.getElementById('radarCompare').getContext('2d');
    if (radarCompareChart) radarCompareChart.destroy();

    const labels = Object.keys(SCORING_CRITERIA).map(k => SCORING_CRITERIA[k].name);
    const data1 = Object.keys(SCORING_CRITERIA).map(k => (r1.scores[k] * 100).toFixed(0));
    const data2 = Object.keys(SCORING_CRITERIA).map(k => (r2.scores[k] * 100).toFixed(0));

    radarCompareChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: [
                {
                    label: r1.formulation.name,
                    data: data1,
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    borderColor: 'rgba(6, 182, 212, 0.8)',
                    borderWidth: 2,
                    pointRadius: 4
                },
                {
                    label: r2.formulation.name,
                    data: data2,
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    borderColor: 'rgba(139, 92, 246, 0.8)',
                    borderWidth: 2,
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true, max: 100,
                    ticks: { color: '#64748b', font: { size: 10 } },
                    grid: { color: 'rgba(148,163,184,0.1)' },
                    pointLabels: { color: '#94a3b8', font: { size: 11, weight: 500 } },
                    angleLines: { color: 'rgba(148,163,184,0.1)' }
                }
            },
            plugins: { legend: { labels: { color: '#f0f4f8' } } }
        }
    });

    // Details
    const detailsDiv = document.getElementById('comparisonDetails');
    const keys = Object.keys(SCORING_CRITERIA);
    detailsDiv.innerHTML = `
        <table class="composition-table">
            <thead><tr><th>Мезон</th><th>${r1.formulation.name}</th><th>${r2.formulation.name}</th><th>Фарқ</th></tr></thead>
            <tbody>
                ${keys.map(k => {
        const s1 = (r1.scores[k] * 100).toFixed(0);
        const s2 = (r2.scores[k] * 100).toFixed(0);
        const diff = s1 - s2;
        const diffColor = diff > 0 ? 'var(--accent-emerald)' : diff < 0 ? 'var(--accent-rose)' : 'var(--text-muted)';
        return `<tr><td>${SCORING_CRITERIA[k].icon} ${SCORING_CRITERIA[k].name}</td><td>${s1}%</td><td>${s2}%</td><td style="color:${diffColor};font-weight:700">${diff > 0 ? '+' : ''}${diff}%</td></tr>`;
    }).join('')}
                <tr style="border-top:2px solid var(--border-color)">
                    <td><strong>УМУМИЙ</strong></td>
                    <td><strong style="color:${r1.grade.color}">${r1.totalScore}</strong></td>
                    <td><strong style="color:${r2.grade.color}">${r2.totalScore}</strong></td>
                    <td><strong>${(r1.totalScore - r2.totalScore).toFixed(1)}</strong></td>
                </tr>
            </tbody>
        </table>
    `;
}

// ==================== EXCIPIENT DATABASE ====================

function renderExcipientFilters() {
    const cats = Object.entries(EXCIPIENT_CATEGORIES);
    document.getElementById('excipientFilters').innerHTML =
        `<button class="filter-btn active" onclick="filterExcipients('ALL')">Барчаси</button>` +
        cats.map(([k, v]) => `<button class="filter-btn" onclick="filterExcipients('${k}')">${v.icon} ${v.nameEn}</button>`).join('');
}

function renderExcipientGrid(filter = 'ALL') {
    const grid = document.getElementById('excipientGrid');
    const search = (document.getElementById('excipientSearch')?.value || '').toLowerCase();
    const excipients = Object.values(EXCIPIENTS_DB).filter(exc => {
        if (filter !== 'ALL' && !exc.categories.includes(filter)) return false;
        if (search && !exc.name.toLowerCase().includes(search) && !(exc.nameRu || '').toLowerCase().includes(search) && !(exc.nameUz || '').toLowerCase().includes(search)) return false;
        return true;
    });

    const totalForms = FORMULATIONS_DB.length;
    grid.innerHTML = excipients.map(exc => {
        const cats = exc.categories.map(c => `<span class="cat-tag">${EXCIPIENT_CATEGORIES[c]?.icon || ''} ${c}</span>`).join('');
        const usageCount = excipientUsageStats[exc.id] || 0;
        const usagePct = ((usageCount / totalForms) * 100).toFixed(0);
        const usageColor = usageCount >= 20 ? 'var(--accent-emerald)' : usageCount >= 10 ? 'var(--accent-cyan)' : usageCount >= 5 ? 'var(--accent-amber)' : 'var(--text-muted)';
        const nameWithUz = exc.nameUz ? `${exc.name} (${exc.nameUz})` : exc.name;

        // Literature references
        const refs = EXCIPIENT_LITERATURE_REFS[exc.id] || [];
        const refsHtml = refs.length > 0
            ? ' ' + refs.map(r => `<a href="#" onclick="event.preventDefault();scrollToLiterature(${r})" style="color:var(--accent-cyan);text-decoration:none;font-size:0.72rem;font-weight:700">[${r}]</a>`).join('')
            : '';

        return `
        <div class="excipient-card">
            <h4>${exc.nameUz || exc.nameRu}</h4>
            <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:2px">${nameWithUz}</div>
            <div class="trade-name">${exc.tradeName || ''}</div>
            <div class="categories">${cats}</div>
            <div style="margin:6px 0;padding:4px 10px;border-radius:8px;background:${usageColor}15;border:1px solid ${usageColor}30;font-size:0.78rem;display:inline-block;cursor:pointer" onclick="showExcipientFormulations('${exc.id}')" title="Босинг — формуляциялар рўйхати">
                📊 <strong style="color:${usageColor}">${usageCount}/${totalForms}</strong> формуляцияда (${usagePct}%) ▶
            </div>
            <div class="excipient-props">
                <div class="prop"><span class="prop-label">Мол. масса</span><span class="prop-value">${exc.molecularWeight || '—'}</span></div>
                <div class="prop"><span class="prop-label">CAS</span><span class="prop-value">${exc.casNumber || '—'}</span></div>
                <div class="prop"><span class="prop-label">Сиқувчанлик</span><span class="prop-value">${exc.compressibility !== null ? (exc.compressibility * 100).toFixed(0) + '%' : '—'}</span></div>
                <div class="prop"><span class="prop-label">Оқувчанлик</span><span class="prop-value">${exc.flowability !== null ? (exc.flowability * 100).toFixed(0) + '%' : '—'}</span></div>
                <div class="prop"><span class="prop-label">Мослик</span><span class="prop-value" style="color:${exc.compatibilityWithCiprofloxacin >= 0.9 ? 'var(--accent-emerald)' : exc.compatibilityWithCiprofloxacin >= 0.7 ? 'var(--accent-amber)' : 'var(--accent-rose)'}">${(exc.compatibilityWithCiprofloxacin * 100).toFixed(0)}%</span></div>
                <div class="prop"><span class="prop-label">Оптимал</span><span class="prop-value">${exc.optimalRange.min}-${exc.optimalRange.max}%</span></div>
            </div>
            <p style="font-size:0.78rem;color:var(--text-muted);margin-top:8px;line-height:1.4">${exc.description}${refsHtml}</p>
        </div>`;
    }).join('');
}

function filterExcipients(category) {
    if (typeof category === 'string' && category !== 'ALL') {
        renderExcipientGrid(category);
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');
    } else {
        renderExcipientGrid('ALL');
        const btns = document.querySelectorAll('.filter-btn');
        btns.forEach(b => b.classList.remove('active'));
        if (btns.length > 0) btns[0].classList.add('active');
    }
}

// ==================== LITERATURE ====================

function renderLiterature() {
    const categories = {};
    LITERATURE.forEach(lit => {
        const cat = lit.category || 'Бошқа';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(lit);
    });

    const catIcons = {
        'AI/ML': '🤖', 'Ципрофлоксацин': '💊', 'Дарслик': '📖',
        'Монография': '📘', 'Маълумотнома': '📗', 'Йўриқнома': '📋',
        'Фармакопея': '🏛️', 'Тадқиқот': '🔬', 'Бошқа': '📄'
    };

    let counter = 0;
    document.getElementById('literatureList').innerHTML = Object.entries(categories).map(([cat, items]) => {
        const icon = catIcons[cat] || '📄';
        const articles = items.map(lit => {
            counter++;
            const refNum = counter;
            const isISBN = lit.doi.startsWith('ISBN') || lit.doi.startsWith('ICH') || lit.doi.startsWith('Ph.Eur');
            const linkHtml = isISBN
                ? `<span class="doi-link">${lit.doi}</span>`
                : `<a href="https://doi.org/${lit.doi}" target="_blank" class="doi-link" onclick="event.stopPropagation()">DOI: ${lit.doi}</a>`;

            // Count how many excipients reference this article
            let excCount = 0;
            for (const refs of Object.values(EXCIPIENT_LITERATURE_REFS)) {
                if (refs.includes(refNum)) excCount++;
            }
            const excBadge = excCount > 0
                ? `<span style="margin-left:8px;font-size:0.72rem;background:rgba(16,185,129,0.12);color:var(--accent-emerald);padding:2px 8px;border-radius:12px;cursor:pointer" onclick="event.stopPropagation();showLiteratureExcipients(${refNum})">🧪 ${excCount} модда ▶</span>`
                : '';

            return `
            <div class="lit-article" id="lit-ref-${refNum}" onclick="showLiteratureExcipients(${refNum})">
                <h4>${refNum}. ${lit.title}${excBadge}</h4>
                <div class="authors">${lit.authors}</div>
                <div class="journal">${lit.journal}, ${lit.year}${lit.volume ? '; ' + lit.volume : ''}${lit.pages ? ': ' + lit.pages + ' б.' : ''}</div>
                ${linkHtml}
                <div class="summary">${lit.summary}</div>
            </div>`;
        }).join('');
        return `<h3 style="margin:2rem 0 1rem;color:var(--accent-cyan);font-size:1.1rem">${icon} ${cat}</h3>${articles}`;
    }).join('');
}

// ==================== NEW FORMULATION ====================

function initNewFormulationForm() {
    addIngredientRow('core');
    addIngredientRow('core');
    addIngredientRow('coating');
}

function addIngredientRow(section) {
    const container = document.getElementById(section === 'core' ? 'newCoreIngredients' : 'newCoatingIngredients');
    const options = Object.entries(EXCIPIENTS_DB).map(([k, v]) =>
        `<option value="${k}">${v.nameUz || v.nameRu} (${v.name})</option>`
    ).join('');

    const div = document.createElement('div');
    div.className = 'ingredient-row';
    div.innerHTML = `
        <select class="comparison-select" data-section="${section}">${options}</select>
        <input type="number" class="search-input" placeholder="%" min="0" max="100" step="0.1" data-section="${section}" style="padding:8px">
        <button class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

function evaluateNewFormulation() {
    const name = document.getElementById('newName').value || 'Янги формуляция';
    const coreRows = document.querySelectorAll('#newCoreIngredients .ingredient-row');
    const coatingRows = document.querySelectorAll('#newCoatingIngredients .ingredient-row');

    const core = [];
    coreRows.forEach(row => {
        const select = row.querySelector('select');
        const input = row.querySelector('input');
        if (select.value && input.value) {
            core.push({ excipientId: select.value, amount: parseFloat(input.value), unit: '%' });
        }
    });

    const coating = [];
    coatingRows.forEach(row => {
        const select = row.querySelector('select');
        const input = row.querySelector('input');
        if (select.value && input.value) {
            coating.push({ excipientId: select.value, amount: parseFloat(input.value), unit: '%' });
        }
    });

    if (core.length === 0) {
        document.getElementById('newFormulationResult').innerHTML = '<p style="color:var(--accent-rose)">⚠️ Камида бир ядро моддасини киритинг!</p>';
        return;
    }

    const newForm = { id: 999, name, ndNumber: 'ЯНГИ', manufacturer: 'Фойдаланувчи', doses: [500], type: 'film-coated', core, coating };
    const result = evaluateFormulation(newForm, EXCIPIENTS_DB);

    document.getElementById('newFormulationResult').innerHTML = `
        <div class="rank-card" style="cursor:default">
            <div class="rank-badge" style="background:var(--gradient-primary);color:white">★</div>
            <div class="rank-info">
                <h3>${name}</h3>
                <div class="nd-number">Янги формуляция | Ядро: ${core.length} модда | Қобиқ: ${coating.length} модда</div>
                <div class="rank-highlights">
                    ${result.strengths.slice(0, 2).map(s => `<span class="highlight-tag strength">✅ ${s.label}</span>`).join('')}
                    ${result.weaknesses.slice(0, 2).map(w => `<span class="highlight-tag weakness">⚠️ ${w.label}</span>`).join('')}
                </div>
            </div>
            <div class="rank-score">
                <div class="score-circle">
                    <span class="score-value">${result.totalScore}</span>
                </div>
                <div class="grade-badge" style="background:${result.grade.color}20;color:${result.grade.color}">${result.grade.letter} — ${result.grade.label}</div>
            </div>
        </div>
        ${result.recommendations.length > 0 ? `
        <h4 style="margin:1rem 0 0.5rem">💡 Тавсиялар:</h4>
        <ul class="recommendations-list">${result.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
        ` : '<p style="color:var(--accent-emerald);margin-top:1rem">✅ Жиддий тавсиялар йўқ</p>'}
    `;
}
