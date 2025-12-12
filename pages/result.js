import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Result() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [view, setView] = useState('patient');

  useEffect(() => {
    if (!router.isReady) return;
    
    // Try sessionStorage first (new dual-form system)
    const storedProfile = sessionStorage.getItem('patientProfile');
    if (storedProfile) {
      try {
        setData(JSON.parse(storedProfile));
        return;
      } catch (e) {
        console.error("Erreur de parsing sessionStorage:", e);
      }
    }
    
    // Fallback to URL query (old OpenAI system)
    const q = router.query.data;
    if (!q) return;

    try {
      if (typeof q === "string") {
        setData(JSON.parse(q));
      } else {
        setData(q);
      }
    } catch (e) {
      console.error("Erreur de parsing JSON:", e);
      setParseError("Impossible de lire les données du programme.");
    }
  }, [router.isReady, router.query.data]);

  if (parseError) {
    return (
      <Layout>
        <h1>Votre programme personnalisé</h1>
        <p>{parseError}</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <h1>Votre programme personnalisé</h1>
        <p>Chargement...</p>
      </Layout>
    );
  }

  const hasRedFlags =
    data.redFlags && data.redFlags.present && Array.isArray(data.redFlags.items);

  return (
    <Layout>
      {/* ULTRA MINIMALIST HEADER */}
      <div style={{ 
        marginBottom: '56px',
        paddingBottom: '24px',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <div style={{ 
          fontSize: '11px', 
          fontWeight: '600', 
          letterSpacing: '0.05em', 
          color: '#6b6b6b',
          marginBottom: '12px',
          textTransform: 'uppercase'
        }}>
          PhysioConcept Pro
        </div>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          marginBottom: '8px', 
          color: '#000000',
          letterSpacing: '-0.03em',
          lineHeight: 1.2
        }}>
          Programme de Réadaptation
        </h1>
        <p style={{ 
          fontSize: '14px', 
          color: '#6b6b6b', 
          margin: 0,
          fontWeight: '400'
        }}>
          Personnalisé · Basé sur l'évidence scientifique
        </p>
      </div>

      {/* MINIMALIST VIEW TOGGLE */}
      <div style={{ 
        display: 'inline-flex', 
        gap: 4, 
        marginBottom: 48,
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: '4px'
      }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center',
          cursor: 'pointer',
          padding: '7px 14px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          backgroundColor: view === 'patient' ? 'white' : 'transparent',
          color: view === 'patient' ? '#000000' : '#6b6b6b',
          boxShadow: view === 'patient' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
        }}>
          <input 
            type="radio" 
            name="view" 
            checked={view === 'patient'}
            onChange={() => setView('patient')}
            style={{ display: 'none' }}
          /> 
          Patient
        </label>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center',
          cursor: 'pointer',
          padding: '7px 14px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          backgroundColor: view === 'clinician' ? 'white' : 'transparent',
          color: view === 'clinician' ? '#000000' : '#6b6b6b',
          boxShadow: view === 'clinician' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
        }}>
          <input 
            type="radio" 
            name="view"
            checked={view === 'clinician'}
            onChange={() => setView('clinician')}
            style={{ display: 'none' }}
          /> 
          Professionnel
        </label>
      </div>

      {/* RED FLAGS - ULTRA CLEAN */}
      {data.redFlags && (
        <div style={{
          backgroundColor: 'white',
          border: hasRedFlags ? '2px solid #dc2626' : '2px solid #10b981',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
          }}>
            <div style={{
              minWidth: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: hasRedFlags ? '#fef2f2' : '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              {hasRedFlags ? '⚠️' : '✅'}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ 
                color: hasRedFlags ? '#dc2626' : '#10b981',
                borderBottom: 'none',
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                {hasRedFlags ? 'Signaux d\'Alerte' : 'Aucun Signal d\'Alerte'}
              </h2>

              {hasRedFlags ? (
                <>
                  <ul style={{ margin: '16px 0', paddingLeft: '20px', color: '#4a4a4a' }}>
                    {data.redFlags.items.map((f, i) => (
                      <li key={i} style={{ marginBottom: '8px', lineHeight: 1.6 }}>{f}</li>
                    ))}
                  </ul>
                  {data.redFlags.recommendation && (
                    <div style={{ 
                      backgroundColor: '#fef2f2',
                      padding: '16px',
                      borderRadius: '8px',
                      marginTop: '16px'
                    }}>
                      <div style={{ fontWeight: '600', color: '#dc2626', marginBottom: '8px', fontSize: '14px' }}>
                        Recommandation
                      </div>
                      <p style={{ margin: 0, lineHeight: 1.6, color: '#4a4a4a', fontSize: '14px' }}>
                        {data.redFlags.recommendation}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p style={{ margin: '8px 0 0 0', color: '#065f46', fontSize: '14px', lineHeight: 1.6 }}>
                  Aucun signe inquiétant détecté. Le traitement conservateur est approprié.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDUCATION - Clean Card Design */}
      {data.education && (
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #e5e7eb',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              📘
            </div>
            <h2 style={{ margin: 0, color: '#2f5ae6', borderBottom: 'none', fontSize: '24px' }}>
              Éducation Thérapeutique
            </h2>
          </div>
          
          <div style={{ display: 'grid', gap: '24px' }}>
            {data.education.understanding && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>💡</span>
                  <strong style={{ color: '#1a2332', fontSize: '16px' }}>Comprendre votre condition</strong>
                </div>
                <p style={{ margin: 0, lineHeight: '1.8', color: '#475569', paddingLeft: '28px' }}>
                  {data.education.understanding}
                </p>
              </div>
            )}
            
            {data.education.meaning && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>🔍</span>
                  <strong style={{ color: '#1a2332', fontSize: '16px' }}>Ce que cela signifie</strong>
                </div>
                <p style={{ margin: 0, lineHeight: '1.8', color: '#475569', paddingLeft: '28px' }}>
                  {data.education.meaning}
                </p>
              </div>
            )}
            
            {data.education.helpful && (
              <div style={{ 
                backgroundColor: '#ecfdf5',
                padding: '20px',
                borderRadius: '12px',
                borderLeft: '4px solid #10b981'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>✅</span>
                  <strong style={{ color: '#059669', fontSize: '16px' }}>Ce qui aide</strong>
                </div>
                <p style={{ margin: 0, lineHeight: '1.8', color: '#065f46' }}>
                  {data.education.helpful}
                </p>
              </div>
            )}
            
            {data.education.avoid && (
              <div style={{ 
                backgroundColor: '#fef2f2',
                padding: '20px',
                borderRadius: '12px',
                borderLeft: '4px solid #f87171'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>⛔</span>
                  <strong style={{ color: '#dc2626', fontSize: '16px' }}>À éviter temporairement</strong>
                </div>
                <p style={{ margin: 0, lineHeight: '1.8', color: '#991b1b' }}>
                  {data.education.avoid}
                </p>
              </div>
            )}
            
            {data.education.progression && (
              <div style={{ 
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                border: '2px solid #cbd5e1'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>📈</span>
                  <strong style={{ color: '#1a2332', fontSize: '16px' }}>Progression attendue</strong>
                </div>
                <p style={{ margin: 0, lineHeight: '1.8', color: '#475569' }}>
                  {data.education.progression}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION PLAN */}
      {data.plan && (
        <>
          <h2>📅 Plan de traitement</h2>
          {data.plan.phase && (
            <p>
              <strong>Phase:</strong> {data.plan.phase}
            </p>
          )}
          {data.plan.duration && (
            <p>
              <strong>Durée:</strong> {data.plan.duration}
            </p>
          )}
          {data.plan.frequency && (
            <p>
              <strong>Fréquence:</strong> {data.plan.frequency}
            </p>
          )}
        </>
      )}

      {/* EXERCISES - Premium Card Design */}
      <div style={{ marginTop: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2f5ae6 0%, #1a3ba8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            💪
          </div>
          <h2 style={{ margin: 0, color: '#1a2332', borderBottom: 'none', fontSize: '28px' }}>
            Exercices Recommandés
          </h2>
        </div>

        {data.exercises?.length > 0 ? (
          <div style={{ display: 'grid', gap: '24px' }}>
            {data.exercises.map((ex, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '0',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2f5ae6';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(47, 90, 230, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Exercise Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #2f5ae6 0%, #1a3ba8 100%)',
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    {i + 1}
                  </div>
                  <h3 style={{ 
                    margin: 0,
                    fontSize: '22px',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {ex.name}
                  </h3>
                </div>

                {/* Exercise Content */}
                <div style={{ padding: '28px' }}>
                  <p style={{ 
                    marginBottom: '24px',
                    lineHeight: '1.8',
                    color: '#475569',
                    fontSize: '16px'
                  }}>
                    {ex.description}
                  </p>

                  {/* Dosage Grid */}
                  {ex.dosage && (
                    <div style={{ 
                      backgroundColor: '#f8fafc',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      border: '2px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '18px' }}>📊</span>
                        <strong style={{ color: '#1a2332', fontSize: '16px' }}>Dosage</strong>
                      </div>
                      {typeof ex.dosage === 'string' ? (
                        <p style={{ margin: 0, color: '#475569' }}>{ex.dosage}</p>
                      ) : (
                        <div style={{ 
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                          gap: '12px'
                        }}>
                          {ex.dosage.reps && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ 
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#2f5ae6'
                              }}></span>
                              <span style={{ color: '#64748b', fontSize: '14px' }}>Répétitions:</span>
                              <strong style={{ color: '#1a2332' }}>{ex.dosage.reps}</strong>
                            </div>
                          )}
                          {ex.dosage.sets && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ 
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#2f5ae6'
                              }}></span>
                              <span style={{ color: '#64748b', fontSize: '14px' }}>Sets:</span>
                              <strong style={{ color: '#1a2332' }}>{ex.dosage.sets}</strong>
                            </div>
                          )}
                          {ex.dosage.frequency && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ 
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#2f5ae6'
                              }}></span>
                              <span style={{ color: '#64748b', fontSize: '14px' }}>Fréquence:</span>
                              <strong style={{ color: '#1a2332' }}>{ex.dosage.frequency}</strong>
                            </div>
                          )}
                          {ex.dosage.tempo && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ 
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#2f5ae6'
                              }}></span>
                              <span style={{ color: '#64748b', fontSize: '14px' }}>Tempo:</span>
                              <strong style={{ color: '#1a2332' }}>{ex.dosage.tempo}</strong>
                            </div>
                          )}
                          {ex.dosage.rest && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ 
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#2f5ae6'
                              }}></span>
                              <span style={{ color: '#64748b', fontSize: '14px' }}>Repos:</span>
                              <strong style={{ color: '#1a2332' }}>{ex.dosage.rest}</strong>
                            </div>
                          )}
                          {ex.dosage.load && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ 
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#2f5ae6'
                              }}></span>
                              <span style={{ color: '#64748b', fontSize: '14px' }}>Charge:</span>
                              <strong style={{ color: '#1a2332' }}>{ex.dosage.load}</strong>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Justification */}
                  {ex.justification && (
                    <div style={{
                      backgroundColor: '#ecfdf5',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      borderLeft: '4px solid #10b981',
                      marginBottom: '20px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ fontSize: '20px', marginTop: '2px' }}>💡</span>
                        <div>
                          <strong style={{ color: '#059669', display: 'block', marginBottom: '6px' }}>
                            Pourquoi cet exercice
                          </strong>
                          <p style={{ margin: 0, lineHeight: '1.7', color: '#065f46' }}>
                            {ex.justification}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Instructions */}
                  {view === 'patient' ? (
                    ex.patientInstructions && (
                      <div style={{ 
                        backgroundColor: '#eff6ff',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '2px solid #bfdbfe'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ fontSize: '20px', marginTop: '2px' }}>👤</span>
                          <div>
                            <strong style={{ color: '#2f5ae6', display: 'block', marginBottom: '6px' }}>
                              Instructions
                            </strong>
                            <div style={{ lineHeight: '1.7', color: '#1e40af' }}>
                              {ex.patientInstructions}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    ex.clinicianChecklist && (
                      <div style={{ 
                        backgroundColor: '#f8fafc',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '2px solid #cbd5e1'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ fontSize: '20px', marginTop: '2px' }}>🩺</span>
                          <div style={{ width: '100%' }}>
                            <strong style={{ color: '#1a2332', display: 'block', marginBottom: '8px' }}>
                              Checklist Physiothérapeute
                            </strong>
                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569' }}>
                              {Array.isArray(ex.clinicianChecklist) ? ex.clinicianChecklist.map((c, ci) => (
                                <li key={ci} style={{ marginBottom: '6px', lineHeight: '1.6' }}>{c}</li>
                              )) : <li>{ex.clinicianChecklist}</li>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
            Aucun exercice généré.
          </p>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div style={{
        marginTop: '48px',
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '2px solid #e5e7eb',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: '14px 28px',
            backgroundColor: '#2f5ae6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(47, 90, 230, 0.25)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(47, 90, 230, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(47, 90, 230, 0.25)';
          }}
        >
          🖨️ Imprimer
        </button>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: '14px 28px',
            backgroundColor: '#64748b',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#475569';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#64748b';
          }}
        >
          ← Retour
        </button>
      </div>
    </Layout>
  );
}
