import ButtonPrimary from '@/components/button/ButtonPrimary';
import LayoutRmib from '@/components/rmib/LayoutRmib';
import React, { useState, useEffect } from 'react';
import ButtonAbuBgt from '@/components/button/ButtonAbuBgt';
import SetCategory from '@/components/button/ButtonCategory';
import Loader from '@/components/Loader';
import { Alert } from 'antd';
import { useRouter } from 'next/router';
import SaveResultApi from '@/api/rmib/SaveResultApi';
import Cookies from 'js-cookie';

const Index = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [userId, setUserId] = useState('');

  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
  const categories = [
    { man: 'Kepala Sekolah', woman: 'Guru SD', name: 'socialService' },
    { man: 'Manajer Bank', woman: 'Sektretaris Pribadi', name: 'clarical' },
    { man: 'Tukang Batu', woman: 'Juru Masak', name: 'practical' },
    { man: 'Ahli Bedah', woman: 'Dokter', name: 'medical' },
    { man: 'Nelayan', woman: 'Petani Bunga', name: 'outdoor' },
    { man: 'Montir', woman: 'Petugas Mesin Sulam', name: 'mecanical' },
    {
      man: 'Akuntan',
      woman: 'Pegawa Urusan Gaji',
      name: 'computational',
    },
    { man: 'Ahli Astronomi', woman: 'Ahli Biologi', name: 'science' },
    {
      man: 'Petugas Wawancara',
      woman: 'Penyiar Radio',
      name: 'personalContact',
    },
    { man: 'Artis', woman: 'Pinata Panggung', name: 'aesthetic' },
    { man: 'Pustakawan', woman: 'Penyair', name: 'literary' },
    { man: 'Pianis Konser', woman: 'Komponis', name: 'music' },
  ];

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFieldCategory, setSelectedFieldCategory] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [selectDisabled, setSelectDisabled] = useState({});

  const handleSelectChange = (event, categoryName) => {
    const selectedNumber = parseInt(event.target.value);

    setSelectedNumbers((prevSelectedNumbers) => ({
      ...prevSelectedNumbers,
      [categoryName]: selectedNumber,
    }));

    if (fieldValues[categoryName] === undefined) {
      setSelectedFields([
        ...selectedFields,
        { number: selectedNumber, title: categoryName },
      ]);
      handleFieldCategoryChange(selectedNumber);

      setFieldValues((prevValues) => ({
        ...prevValues,
        [categoryName]: selectedNumber,
      }));

      // Set status disabled untuk kategori ini menjadi true
      setSelectDisabled((prevSelectDisabled) => ({
        ...prevSelectDisabled,
        [categoryName]: true,
      }));
    } else {
      // Jika nilai sudah ada, batalkan pemilihan
      const updatedNumbers = { ...selectedNumbers };
      updatedNumbers[categoryName] = '';
      setSelectedNumbers(updatedNumbers);

      const updatedFields = selectedFields.filter(
        (field) => field.title !== categoryName,
      );
      setSelectedFields(updatedFields);

      setSelectedFieldCategory((prevMap) => {
        const updatedMap = { ...prevMap };
        delete updatedMap[selectedNumber];
        return updatedMap;
      });

      setFieldValues((prevValues) => {
        const updatedValues = { ...prevValues };
        delete updatedValues[categoryName];
        return updatedValues;
      });

      setSelectDisabled((prevSelectDisabled) => ({
        ...prevSelectDisabled,
        [categoryName]: false,
      }));
    }
  };

  const handleFieldCategoryChange = (fieldNumber) => {
    if (!selectedCategory) {
      return;
    }

    const selectedCategoryObj = categories.find(
      (cat) => cat.name === selectedCategory,
    );

    if (!selectedCategoryObj) {
      return;
    }

    setSelectDisabled((prevSelectDisabled) => ({
      ...prevSelectDisabled,
      [categoryName]: false,
    }));

    const categoryName = selectedCategoryObj.name;
    setSelectedFieldCategory((prevMap) => ({
      ...prevMap,
      [fieldNumber]: categoryName,
    }));

    const fieldValue = fieldNumber;

    setFieldValues((prevValues) => ({
      ...prevValues,
      [categoryName]: fieldValue,
    }));
  };

  const handleCancel = (categoryName) => {
    setSelectedNumbers((prevSelectedNumbers) => {
      const { [categoryName]: removedValue, ...rest } = prevSelectedNumbers;
      return rest;
    });

    const updatedFields = selectedFields.filter(
      (field) => field.title !== categoryName,
    );

    setSelectedFields(updatedFields);

    setSelectedFieldCategory((prevMap) => {
      const updatedMap = { ...prevMap };
      for (const field of updatedFields) {
        delete updatedMap[field.number];
      }
      return updatedMap;
    });

    setFieldValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[categoryName];
      return updatedValues;
    });

    setSelectDisabled((prevSelectDisabled) => ({
      ...prevSelectDisabled,
      [categoryName]: false,
    }));
  };

  const handleSelesai = () => {
    const storedValue = localStorage.getItem('accumulatedValues');
    if (Object.keys(fieldValues).length === 12) {
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);

        const accumulatedValues = { ...fieldValues };

        for (const category in parsedValue) {
          if (parsedValue.hasOwnProperty(category)) {
            if (!accumulatedValues[category]) {
              accumulatedValues[category] = parsedValue[category];
            } else {
              accumulatedValues[category] += parsedValue[category];
            }
          }
        }
        localStorage.setItem(
          'accumulatedValues',
          JSON.stringify(accumulatedValues),
        );
      }
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setShowNextButton(true);
      }, 2000);
    } else {
      setAlertVisible(true);
      setMessage('Pilih semua jenis pekerjaan');
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    }
  };

  const handleNextClick = () => {
    if (result) {
      SaveResultApi({
        result,
        minat,
      }).then((res) => {
        console.log(res);
        if (res.status === true) {
          console.log('Berhasil');
        } else {
          console.log('Gagal');
        }
      });
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push('/tes-rmib/result');
      }, 3000);
    }
  };

  const [minat, setMinat] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const user = JSON.parse(Cookies.get('User'));

    setUserId(user.id);

    const getHasil = JSON.parse(localStorage.getItem('accumulatedValues'));
    const dataArray = Object.entries(getHasil);

    dataArray.sort((a, b) => a[1] - b[1]);
    const sortedObject = {};
    dataArray.forEach((item) => {
      sortedObject[item[0]] = item[1];
    });
    const keysUntilNine = Object.keys(sortedObject).slice(0, 12);
    const jsonObject = keysUntilNine.reduce((obj, key, index) => {
      obj[key] = index + 1;
      return obj;
    }, {});

    const resultArray = Object.keys(jsonObject).map((key) => key);
    const hasil = JSON.stringify(resultArray);

    console.log('Keys from first to nine:', hasil);
    setMinat(keysUntilNine[0]);
    setResult(hasil);
  }, []);

  return (
    <LayoutRmib>
      {isLoading ? <Loader /> : null}
      <section className="md:px-16 lg:px-40">
        <p className="mt-5 mb-5 font-medium text-center text-black">
          Urutkan Pekerjaan
        </p>

        <span className="flex justify-center">
          {alertVisible ? (
            <Alert
              type="error"
              message={message}
              showIcon
              className="w-1/2 mb-5 text-center"
            />
          ) : null}
          {isSuccess ? (
            <Alert
              type="success"
              message={'Semua Test Sudah Dilakukan, silahkan lihat hasil'}
              showIcon
              className="w-1/2 mb-5 text-center"
            />
          ) : null}
        </span>

        <fieldset className="flex justify-center">
          <div className="flex flex-col items-center w-full space-y-4 ">
            {categories.map((category, i) => (
              <div key={i} className="">
                <SetCategory men={category.man} woman={category.woman}>
                  <select
                    onChange={(event) =>
                      handleSelectChange(event, category.name)
                    }
                    value={selectedNumbers[category.name] || ''}
                    disabled={selectDisabled[category.name]}
                    className="w-20 text-sm font-medium text-center text-orange-700 bg-orange-200 border border-orange-700 cursor-pointer rounded-xl"
                  >
                    <option value="" disabled={!selectedCategory}>
                      {selectedNumbers[category.name]
                        ? `Nomor ${selectedNumbers[category.name]}`
                        : 'Pilih'}
                    </option>
                    {numbers.map((number) => {
                      const isNumberSelected = selectedFields.some(
                        (field) => field.number === number,
                      );
                      return (
                        <option
                          key={number}
                          value={number}
                          disabled={isNumberSelected}
                        >
                          {number}
                        </option>
                      );
                    })}
                  </select>

                  {selectedFields.some(
                    (field) => field.title === category.name,
                  ) && (
                    <button
                      onClick={() => handleCancel(category.name)}
                      className="px-2 text-xs font-medium text-red-600 bg-red-500 bg-opacity-30 rounded-xl"
                    >
                      Cancel
                    </button>
                  )}
                </SetCategory>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex justify-end mt-5">
          {showNextButton ? (
            <ButtonAbuBgt title={'Selanjutnya'} onClick={handleNextClick} />
          ) : (
            <ButtonAbuBgt onClick={handleSelesai} title={'Selesai'} />
          )}
        </fieldset>
      </section>
    </LayoutRmib>
  );
};

export default Index;
