/**
 * ===============================================================================
 * SCORING ENGINE — Баҳолаш алгоритми
 * ===============================================================================
 * 
 * 8 мезон бўйича 100 баллик тизим:
 * 1. Эриш профили (Dissolution) — 20%
 * 2. Парчаланиш (Disintegration) — 15%
 * 3. Сиқилувчанлик (Compressibility) — 12%
 * 4. Оқувчанлик (Flowability) — 10%
 * 5. Қобиқ сифати (Coating Quality) — 15%
 * 6. Барқарорлик (Stability) — 12%
 * 7. Биомавжудлик (Bioavailability) — 10%
 * 8. Хавфсизлик (Safety) — 6%
 * 
 * Илмий асослар:
 * - USP <711> Dissolution, <701> Disintegration
 * - ICH Q8(R2) Quality by Design
 * - BCS Classification System
 * ===============================================================================
 */

const SCORING_CRITERIA = {
    dissolution: {
        id: 'dissolution',
        name: 'Эриш профили',
        nameEn: 'Dissolution Profile',
        weight: 0.20,
        icon: '💧',
        description: 'BCS IV синфи учун ҳал қилувчи. Дори модда тез ва тўлиқ эриши керак.',
        scientificBasis: 'USP <711> бўйича 30 дақиқада ≥80% эриши талаб қилинади.'
    },
    disintegration: {
        id: 'disintegration',
        name: 'Парчаланиш вақти',
        nameEn: 'Disintegration Time',
        weight: 0.15,
        icon: '⏱️',
        description: 'Тез парчаланиш = тез эриш ва шимилиш.',
        scientificBasis: 'USP <701> бўйича қобиқли таблетка ≤30 дақиқада парчаланиши керак.'
    },
    compressibility: {
        id: 'compressibility',
        name: 'Сиқилувчанлик',
        nameEn: 'Compressibility',
        weight: 0.12,
        icon: '🔨',
        description: 'Таблетка мустаҳкамлиги ва бутунлиги.',
        scientificBasis: 'Қаттиқлик 40-80 Н, нураш (friability) ≤1.0% бўлиши керак.'
    },
    flowability: {
        id: 'flowability',
        name: 'Оқувчанлик',
        nameEn: 'Flowability',
        weight: 0.10,
        icon: '🌊',
        description: 'Ишлаб чиқариш самарадорлиги. Яхши оқувчанлик = бир хил таблеткалар.',
        scientificBasis: 'Carr индекси ≤25%, Hausner нисбати ≤1.25 мақбул.'
    },
    coatingQuality: {
        id: 'coatingQuality',
        name: 'Қобиқ сифати',
        nameEn: 'Coating Quality',
        weight: 0.15,
        icon: '🛡️',
        description: 'Қобиқ мустаҳкамлиги, силлиқлиги, бир хиллиги.',
        scientificBasis: 'HPMC/PVA қобиқлар: оптимал қалинлик 30-80 мкм.'
    },
    stability: {
        id: 'stability',
        name: 'Барқарорлик',
        nameEn: 'Stability',
        weight: 0.12,
        icon: '🏛️',
        description: 'Сақлаш муддати ва шароитларга чидамлилик.',
        scientificBasis: 'ICH Q1A(R2): 25°C/60%RH да 24 ой, 40°C/75%RH да 6 ой барқарор.'
    },
    bioavailability: {
        id: 'bioavailability',
        name: 'Биомавжудлик потенциали',
        nameEn: 'Bioavailability Potential',
        weight: 0.10,
        icon: '🧬',
        description: 'Фаол модда организмга шимилиш самарадорлиги.',
        scientificBasis: 'Ципрофлоксацин биомавжудлиги 70-80%. Таркиб уни 60% дан пасайтирмаслиги керак.'
    },
    safety: {
        id: 'safety',
        name: 'Хавфсизлик',
        nameEn: 'Safety Profile',
        weight: 0.06,
        icon: '✅',
        description: 'Ёрдамчи моддалар хавфсизлиги.',
        scientificBasis: 'Барча моддалар GRAS/FDA мақомига эга бўлиши керак.'
    }
};

/**
 * Формуляцияни баҳолаш функцияси
 */
function evaluateFormulation(formulation, excipientDb) {
    const scores = {};
    const details = {};
    const allIngredients = [...formulation.core, ...(formulation.coating || [])];

    // 1. ЭРИШ ПРОФИЛИ (Dissolution)
    scores.dissolution = calcDissolutionScore(formulation, excipientDb);
    details.dissolution = getDissolutionDetails(formulation, excipientDb);

    // 2. ПАРЧАЛАНИШ (Disintegration)
    scores.disintegration = calcDisintegrationScore(formulation, excipientDb);
    details.disintegration = getDisintegrationDetails(formulation, excipientDb);

    // 3. СИҚИЛУВЧАНЛИК (Compressibility)
    scores.compressibility = calcCompressibilityScore(formulation, excipientDb);
    details.compressibility = getCompressibilityDetails(formulation, excipientDb);

    // 4. ОҚУВЧАНЛИК (Flowability)
    scores.flowability = calcFlowabilityScore(formulation, excipientDb);
    details.flowability = getFlowabilityDetails(formulation, excipientDb);

    // 5. ҚОБИҚ СИФАТИ (Coating Quality)
    scores.coatingQuality = calcCoatingScore(formulation, excipientDb);
    details.coatingQuality = getCoatingDetails(formulation, excipientDb);

    // 6. БАРҚАРОРЛИК (Stability)
    scores.stability = calcStabilityScore(formulation, excipientDb);
    details.stability = getStabilityDetails(formulation, excipientDb);

    // 7. БИОМАВЖУДЛИК (Bioavailability)
    scores.bioavailability = calcBioavailabilityScore(formulation, excipientDb);
    details.bioavailability = getBioavailabilityDetails(formulation, excipientDb);

    // 8. ХАВФСИЗЛИК (Safety)
    scores.safety = calcSafetyScore(formulation, excipientDb);
    details.safety = getSafetyDetails(formulation, excipientDb);

    // Umumiy ball
    let totalScore = 0;
    let totalWeight = 0;
    for (const [key, score] of Object.entries(scores)) {
        const weight = SCORING_CRITERIA[key].weight;
        totalScore += score * weight;
        totalWeight += weight;
    }
    const finalScore = (totalScore / totalWeight) * 100;

    return {
        formulation,
        scores,
        details,
        totalScore: Math.round(finalScore * 10) / 10,
        grade: getGrade(finalScore),
        strengths: getStrengths(scores),
        weaknesses: getWeaknesses(scores),
        recommendations: getRecommendations(scores, formulation, excipientDb)
    };
}

// ==================== БАҲОЛАШ ФУНКЦИЯЛАРИ ====================

function calcDissolutionScore(form, db) {
    let score = 0.5; // Базавий
    const core = form.core;

    // Суперпарчаловчи мавжудлиги ва миқдори
    const superDisintegrants = core.filter(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('SUPERDISINTEGRANT');
    });

    if (superDisintegrants.length > 0) {
        const totalSD = superDisintegrants.reduce((s, i) => s + i.amount, 0);
        if (totalSD >= 3 && totalSD <= 5) score += 0.25;
        else if (totalSD >= 2 && totalSD < 3) score += 0.15;
        else if (totalSD > 5) score += 0.18; // Ортиқча
        else score += 0.08;
    }

    // Мойловчи таъсири (салбий)
    const lubricants = core.filter(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('LUBRICANT');
    });
    const totalLub = lubricants.reduce((s, i) => s + i.amount, 0);
    if (totalLub <= 0.5) score += 0.15;
    else if (totalLub <= 1.0) score += 0.08;
    else if (totalLub > 1.5) score -= 0.10; // Жуда кўп мойловчи

    // Excipient dissolution effect
    for (const ing of core) {
        const exc = db[ing.excipientId];
        if (exc && exc.dissolutionEffect) {
            score += (exc.dissolutionEffect - 0.5) * (ing.amount / 100) * 2;
        }
    }

    return Math.max(0, Math.min(1, score));
}

function calcDisintegrationScore(form, db) {
    let score = 0.4;
    const core = form.core;

    // Суперпарчаловчилар
    const superDisint = core.filter(i => {
        const exc = db[i.excipientId];
        return exc && (exc.categories.includes('SUPERDISINTEGRANT') || exc.categories.includes('DISINTEGRANT'));
    });

    if (superDisint.length > 0) {
        const totalAmount = superDisint.reduce((s, i) => s + i.amount, 0);
        // Энг яхши суперпарчаловчи эффекти
        const bestEffect = Math.max(...superDisint.map(i => db[i.excipientId]?.disintegrationEffect || 0));

        if (totalAmount >= 3 && totalAmount <= 5) {
            score += 0.30 * bestEffect;
        } else if (totalAmount >= 2) {
            score += 0.20 * bestEffect;
        } else {
            score += 0.10 * bestEffect;
        }
    }

    // Мойловчи ва боғловчи салбий таъсири
    for (const ing of core) {
        const exc = db[ing.excipientId];
        if (exc) {
            if (exc.categories.includes('LUBRICANT') && ing.amount > 1.0) {
                score -= 0.08;
            }
            if (exc.categories.includes('BINDER') && ing.amount > 4) {
                score -= 0.05;
            }
        }
    }

    return Math.max(0, Math.min(1, score));
}

function calcCompressibilityScore(form, db) {
    let score = 0;
    let totalWeight = 0;

    for (const ing of form.core) {
        const exc = db[ing.excipientId];
        if (exc && exc.compressibility !== null) {
            score += exc.compressibility * ing.amount;
            totalWeight += ing.amount;
        }
    }

    if (totalWeight > 0) {
        score = score / totalWeight;
    }

    // МКЦ бонуси
    const mcc = form.core.filter(i => i.excipientId.startsWith('MCC_'));
    if (mcc.length > 0) {
        const mccAmount = mcc.reduce((s, i) => s + i.amount, 0);
        if (mccAmount >= 15 && mccAmount <= 30) score += 0.10;
        else if (mccAmount >= 10) score += 0.05;
    }

    return Math.max(0, Math.min(1, score));
}

function calcFlowabilityScore(form, db) {
    let score = 0;
    let totalWeight = 0;

    for (const ing of form.core) {
        const exc = db[ing.excipientId];
        if (exc && exc.flowability !== null) {
            score += exc.flowability * ing.amount;
            totalWeight += ing.amount;
        }
    }

    if (totalWeight > 0) {
        score = score / totalWeight;
    }

    // Сирғанувчи бонуси
    const glidants = form.core.filter(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('GLIDANT');
    });
    if (glidants.length > 0) {
        const glidantAmount = glidants.reduce((s, i) => s + i.amount, 0);
        if (glidantAmount >= 0.3 && glidantAmount <= 1.0) score += 0.15;
        else if (glidantAmount > 0) score += 0.08;
    }

    return Math.max(0, Math.min(1, score));
}

function calcCoatingScore(form, db) {
    if (!form.coating || form.coating.length === 0) return 0.1;

    let score = 0.3;

    // Қобиқ агенти бор?
    const coatingAgent = form.coating.find(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('COATING');
    });

    if (coatingAgent) {
        const exc = db[coatingAgent.excipientId];
        const amount = coatingAgent.amount;

        // Оптимал миқдор
        if (amount >= 2.5 && amount <= 4.0) score += 0.25;
        else if (amount >= 2.0 && amount <= 5.0) score += 0.15;
        else score += 0.08;

        // PVA бонуси (замонавий)
        if (coatingAgent.excipientId === 'PVA') score += 0.05;
    }

    // Пластификатор бор?
    const plasticizer = form.coating.find(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('PLASTICIZER');
    });
    if (plasticizer) {
        const amount = plasticizer.amount;
        if (amount >= 0.5 && amount <= 1.5) score += 0.15;
        else score += 0.08;

        // Триацетин бонуси
        if (plasticizer.excipientId === 'TRIACETIN') score += 0.05;
    }

    // Матлаштирувчи (TiO2) — ёруғликдан ҳимоя
    const opacifier = form.coating.find(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('OPACIFIER');
    });
    if (opacifier) {
        if (opacifier.amount >= 0.8 && opacifier.amount <= 1.5) score += 0.10;
        else score += 0.05;
    }

    // Яхшилаш: Talc ёки Polydextrose бор?
    const hasAntiTack = form.coating.some(i => i.excipientId === 'TALC');
    const hasPolydextrose = form.coating.some(i => i.excipientId === 'POLYDEXTROSE');
    if (hasAntiTack) score += 0.05;
    if (hasPolydextrose) score += 0.03;

    return Math.max(0, Math.min(1, score));
}

function calcStabilityScore(form, db) {
    let score = 0;
    let totalWeight = 0;
    const all = [...form.core, ...(form.coating || [])];

    for (const ing of all) {
        const exc = db[ing.excipientId];
        if (exc && exc.stabilityContribution) {
            score += exc.stabilityContribution * ing.amount;
            totalWeight += ing.amount;
        }
    }

    if (totalWeight > 0) score = score / totalWeight;

    // Мослик ципрофлоксацин билан
    let compatScore = 0;
    let compatCount = 0;
    for (const ing of all) {
        const exc = db[ing.excipientId];
        if (exc && exc.compatibilityWithCiprofloxacin) {
            compatScore += exc.compatibilityWithCiprofloxacin;
            compatCount++;
        }
    }
    if (compatCount > 0) {
        const avgCompat = compatScore / compatCount;
        score = score * 0.6 + avgCompat * 0.4;
    }

    // TiO2 бонуси (фотобарқарорлик)
    const hasTiO2 = all.some(i => i.excipientId === 'TITANIUM_DIOXIDE');
    if (hasTiO2) score += 0.05;

    // Намлик ютувчи моддалар жарима
    let hygroscopicPenalty = 0;
    for (const ing of form.core) {
        const exc = db[ing.excipientId];
        if (exc && exc.hygroscopicity === 'Юқори' && ing.amount > 3) {
            hygroscopicPenalty += 0.03;
        }
    }
    score -= hygroscopicPenalty;

    return Math.max(0, Math.min(1, score));
}

function calcBioavailabilityScore(form, db) {
    let score = 0.5;

    // Эриш таъсири
    const dissScore = calcDissolutionScore(form, db);
    score += dissScore * 0.25;

    // Парчаланиш таъсири
    const disintScore = calcDisintegrationScore(form, db);
    score += disintScore * 0.15;

    // Мослик
    let compatTotal = 0;
    let compatCount = 0;
    for (const ing of form.core) {
        const exc = db[ing.excipientId];
        if (exc) {
            compatTotal += exc.compatibilityWithCiprofloxacin || 0.5;
            compatCount++;
        }
    }
    if (compatCount > 0) {
        score += (compatTotal / compatCount - 0.5) * 0.3;
    }

    // Мойловчи камлиги бонуси
    const lubricants = form.core.filter(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('LUBRICANT');
    });
    const totalLub = lubricants.reduce((s, i) => s + i.amount, 0);
    if (totalLub <= 0.6) score += 0.05;

    return Math.max(0, Math.min(1, score));
}

function calcSafetyScore(form, db) {
    let score = 1.0;
    const all = [...form.core, ...(form.coating || [])];

    for (const ing of all) {
        const exc = db[ing.excipientId];
        if (exc) {
            if (!exc.safetyProfile.gras) score -= 0.15;
            if (!exc.safetyProfile.fdaApproved) score -= 0.20;

            // Оптимал диапазондан чиқиш
            if (ing.amount > exc.optimalRange.max) {
                score -= 0.05 * ((ing.amount - exc.optimalRange.max) / exc.optimalRange.max);
            }
        } else {
            score -= 0.10; // Номаълум модда
        }
    }

    return Math.max(0, Math.min(1, score));
}

// ==================== ТАФСИЛОТ ФУНКЦИЯЛАРИ ====================

function getDissolutionDetails(form, db) {
    const items = [];
    for (const ing of form.core) {
        const exc = db[ing.excipientId];
        if (exc) {
            if (exc.categories.includes('SUPERDISINTEGRANT')) {
                items.push(`✅ ${exc.nameUz} (${ing.amount}%) — тез парчалайди ва эришни тезлаштиради`);
            }
            if (exc.categories.includes('LUBRICANT') && ing.amount > 1.0) {
                items.push(`⚠️ ${exc.nameUz} (${ing.amount}%) — кўп миқдорда эришни секинлаштириши мумкин`);
            }
        }
    }
    return items;
}

function getDisintegrationDetails(form, db) {
    const items = [];
    const superDisint = form.core.filter(i => {
        const exc = db[i.excipientId];
        return exc && (exc.categories.includes('SUPERDISINTEGRANT') || exc.categories.includes('DISINTEGRANT'));
    });
    const totalSD = superDisint.reduce((s, i) => s + i.amount, 0);
    items.push(`Парчаловчилар жами: ${totalSD.toFixed(1)}%`);
    if (totalSD >= 3 && totalSD <= 5) items.push('✅ Оптимал диапазон');
    else if (totalSD < 2) items.push('⚠️ Кам миқдор — парчаланиш секин бўлиши мумкин');
    return items;
}

function getCompressibilityDetails(form, db) {
    const items = [];
    const mcc = form.core.filter(i => i.excipientId.startsWith('MCC_'));
    const totalMCC = mcc.reduce((s, i) => s + i.amount, 0);
    items.push(`МКЦ жами: ${totalMCC.toFixed(1)}%`);
    if (totalMCC >= 15) items.push('✅ Яхши сиқилувчанлик таъминлайди');
    else items.push('⚠️ МКЦ камроқ — сиқилувчанлик паст бўлиши мумкин');
    return items;
}

function getFlowabilityDetails(form, db) {
    const items = [];
    const glidants = form.core.filter(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('GLIDANT');
    });
    if (glidants.length > 0) {
        items.push(`✅ Сирғанувчи модда мавжуд: ${glidants.map(i => db[i.excipientId].nameUz).join(', ')}`);
    } else {
        items.push('⚠️ Сирғанувчи модда йўқ');
    }
    return items;
}

function getCoatingDetails(form, db) {
    const items = [];
    if (!form.coating || form.coating.length === 0) {
        items.push('❌ Қобиқ таркиби аниқланмаган');
        return items;
    }
    for (const ing of form.coating) {
        const exc = db[ing.excipientId];
        if (exc) items.push(`${exc.nameUz} — ${ing.amount}%`);
    }
    return items;
}

function getStabilityDetails(form, db) {
    const items = [];
    const hasTiO2 = [...form.core, ...(form.coating || [])].some(i => i.excipientId === 'TITANIUM_DIOXIDE');
    if (hasTiO2) items.push('✅ TiO₂ — ёруғликдан ҳимоя');

    for (const ing of form.core) {
        const exc = db[ing.excipientId];
        if (exc && exc.hygroscopicity === 'Юқори' && ing.amount > 3) {
            items.push(`⚠️ ${exc.nameUz} юқори гигроскопик — намликдан ҳимоя керак`);
        }
    }
    return items;
}

function getBioavailabilityDetails(form, db) {
    const items = [];
    items.push('Ципрофлоксацин базавий биомавжудлиги: 70-80%');
    const lubricants = form.core.filter(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('LUBRICANT');
    });
    const totalLub = lubricants.reduce((s, i) => s + i.amount, 0);
    if (totalLub <= 0.6) items.push('✅ Мойловчи кам — биомавжудликка салбий таъсир минимал');
    else if (totalLub > 1.2) items.push('⚠️ Мойловчи кўп — биомавжудлик пасайиши мумкин');
    return items;
}

function getSafetyDetails(form, db) {
    const items = [];
    const all = [...form.core, ...(form.coating || [])];
    let allGras = true;
    for (const ing of all) {
        const exc = db[ing.excipientId];
        if (exc && (!exc.safetyProfile.gras || !exc.safetyProfile.fdaApproved)) {
            items.push(`⚠️ ${exc.nameUz} — GRAS/FDA мақоми йўқ`);
            allGras = false;
        }
        if (exc && ing.amount > exc.optimalRange.max) {
            items.push(`⚠️ ${exc.nameUz}: ${ing.amount}% > оптимал максимум ${exc.optimalRange.max}%`);
        }
    }
    if (allGras) items.push('✅ Барча моддалар GRAS/FDA тасдиқланган');
    return items;
}

// ==================== ЁРДАМЧИ ФУНКЦИЯЛАР ====================

function getGrade(score) {
    if (score >= 90) return { letter: 'A+', color: '#00e676', label: 'Аъло' };
    if (score >= 82) return { letter: 'A', color: '#4caf50', label: 'Жуда яхши' };
    if (score >= 75) return { letter: 'B+', color: '#8bc34a', label: 'Яхши' };
    if (score >= 68) return { letter: 'B', color: '#cddc39', label: 'Қониқарли' };
    if (score >= 60) return { letter: 'C', color: '#ffeb3b', label: 'Ўрта' };
    if (score >= 50) return { letter: 'D', color: '#ff9800', label: 'Паст' };
    return { letter: 'F', color: '#f44336', label: 'Қониқарсиз' };
}

function getStrengths(scores) {
    const strengths = [];
    for (const [key, score] of Object.entries(scores)) {
        if (score >= 0.80) {
            strengths.push({ criterion: key, score, label: SCORING_CRITERIA[key].name });
        }
    }
    return strengths.sort((a, b) => b.score - a.score);
}

function getWeaknesses(scores) {
    const weaknesses = [];
    for (const [key, score] of Object.entries(scores)) {
        if (score < 0.60) {
            weaknesses.push({ criterion: key, score, label: SCORING_CRITERIA[key].name });
        }
    }
    return weaknesses.sort((a, b) => a.score - b.score);
}

function getRecommendations(scores, form, db) {
    const recs = [];

    if (scores.dissolution < 0.65) {
        recs.push('Суперпарчаловчи (кросповидон/кроскармеллоза) миқдорини 3-5% гача оширинг');
    }
    if (scores.disintegration < 0.60) {
        recs.push('Парчаловчи модда қўшинг ёки миқдорини оширинг');
    }
    if (scores.compressibility < 0.60) {
        recs.push('МКЦ (Avicel) миқдорини 15-25% гача оширинг');
    }
    if (scores.flowability < 0.60) {
        recs.push('Коллоид SiO₂ (Aerosil) 0.5-1.0% қўшинг');
    }
    if (scores.coatingQuality < 0.65) {
        recs.push('Қобиқ таркибига PVA ёки триацетин қўшишни кўриб чиқинг');
    }
    if (scores.stability < 0.70) {
        recs.push('TiO₂ (фотобарқарорлик учун) ва намликдан ҳимоя чораларини кўринг');
    }

    // Мойловчи огоҳлантириш
    const lubricants = form.core.filter(i => {
        const exc = db[i.excipientId];
        return exc && exc.categories.includes('LUBRICANT');
    });
    const totalLub = lubricants.reduce((s, i) => s + i.amount, 0);
    if (totalLub > 1.0) {
        recs.push(`Мойловчи миқдорини камайтиринг (ҳозир: ${totalLub}%, тавсия: ≤1.0%)`);
    }

    // Натрий стеарил фумарат тавсияси
    const hasMgSt = form.core.some(i => i.excipientId === 'MAGNESIUM_STEARATE');
    if (hasMgSt && scores.dissolution < 0.70) {
        recs.push('Магний стеарат ўрнига натрий стеарил фумарат (Pruv) кўриб чиқинг — эришга камроқ салбий таъсир');
    }

    return recs;
}

/**
 * Барча формуляцияларни баҳолаш ва рейтинг тузиш
 */
function rankFormulations(formulations, excipientDb) {
    const results = formulations.map(f => evaluateFormulation(f, excipientDb));
    results.sort((a, b) => b.totalScore - a.totalScore);

    // Рейтинг рақамини қўшиш
    results.forEach((r, i) => {
        r.rank = i + 1;
    });

    return results;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SCORING_CRITERIA, evaluateFormulation, rankFormulations };
}
