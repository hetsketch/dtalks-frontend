<template>
  <section class="events">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8 is-narrow">
          <h1 class="title is-2">Создать ивент</h1>
          <b-field :type="errors.has('event_title') ? 'is-danger' : ''"
                   :message="errors.has('event_title') ? errors.first('event_title') : ''">
            <b-input v-model="event.title"
                     placeholder="Название ивента"
                     size="is-medium"
                     v-validate="'required|min:5|max:100'"
                     name="event_title">
            </b-input>
          </b-field>
          <b-field :type="errors.has('event_text') ? 'is-danger' : ''"
                   :message="errors.has('event_text') ? errors.first('event_text') : ''">
            <b-input v-model="event.text"
                     placeholder="Описание ивента"
                     type="textarea"
                     name="event_text"
                     v-validate="'required|min:100|max:10000'"
                     minlength="100"
                     maxlength="10000">
            </b-input>
          </b-field>

          <b-field grouped>
            <b-field label="Начало">
              <b-field>
                <b-field>
                  <b-datepicker placeholder="День"
                                v-model="start_day"
                                :date-formatter="dateFormat"
                                :first-day-of-week="1"
                                :min-date="minDate()"
                                :month-names="months()"
                                :day-names="days()"
                                v-validate="`required`"
                  ></b-datepicker>
                  <p class="control">
                    <a class="button" @click="start_day = now()">Сегодня</a>
                  </p>
                  <p class="control">
                    <a class="button" @click="start_day = tomorrow()">Завтра</a>
                  </p>
                  <p class="control">
                    <a class="button" @click="start_day = dayLater()">Через день</a>
                  </p>
                </b-field>
                <b-field>
                  <b-timepicker placeholder="Время"
                                v-model="start_time"
                                :increment-minutes="15"
                                :min-time="setStartMinTime()"
                                v-validate="`required`"
                  ></b-timepicker>
                </b-field>
              </b-field>
            </b-field>
          </b-field>

          <b-field grouped>
            <b-field label="Окончание">
              <b-field>
                <b-field>
                  <b-datepicker placeholder="День"
                                v-model="end_day"
                                :date-formatter="dateFormat"
                                :first-day-of-week="1"
                                :min-date="minDate()"
                                :month-names="months()"
                                :day-names="days()"
                                v-validate="`required`"
                  ></b-datepicker>
                  <p class="control">
                    <a class="button" @click="end_day = now()">Сегодня</a>
                  </p>
                  <p class="control">
                    <a class="button" @click="end_day = tomorrow()">Завтра</a>
                  </p>
                  <p class="control">
                    <a class="button" @click="end_day = dayLater()">Через день</a>
                  </p>
                </b-field>
                <b-field>
                  <b-timepicker placeholder="Время"
                                v-model="end_time"
                                :increment-minutes="15"
                                v-validate="`required`"
                  ></b-timepicker>
                </b-field>
              </b-field>
            </b-field>
          </b-field>

          <b-field grouped>
            <b-field label="Тип ивента">
              <b-select placeholder="Выберите тип">
                <option
                  v-for="option in categories"
                  :value="option.id"
                  :key="option.id">
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>

            <b-field label="Стоимость"
                     :type="errors.has('event_price') ? 'is-danger' : ''"
                     :message="errors.has('event_price') ? errors.first('event_price') : ''">
              <b-input v-model="event.price"
                       placeholder="Стоимость"
                       v-validate="'required'"
                       name="event_price">
              </b-input>
            </b-field>

          </b-field>
          <div class="field">
            <b-switch v-model="event.online"
            >Онлайн ивент
            </b-switch>
          </div>
          <div v-if="!event.online">
            <b-field grouped>
              <b-field label="Город" expanded>
                <b-autocomplete
                  v-model="event.city"
                  placeholder="Выберите город"
                  :data="cities"
                  field="user.first_name"
                  @select="option => selected = option"
                  v-validate="`required|alpha_dash`">
                </b-autocomplete>
              </b-field>
              <b-field label="Адрес" expanded message="Например: ул. Ленина 27, South Cafe, зал 3"
                       class="has-text-grey">
                <b-input
                  v-model="event.address"
                  placeholder="Укажите точный адрес и место"
                  v-validate="`required`">
                </b-input>
              </b-field>
            </b-field>
            <div class="is-divider" data-content="ИЛИ ОТМЕТЬТЕ МЕСТО НА КАРТЕ"></div>
            <b-field>
              <!--todo: get current user coordinates-->
              <yandex-map
                :coords="[userLat, userLon]"
                zoom="9"
                :controls="['zoomControl']"
                :detailedControls="{ 'searchControl': { provider: 'yandex#search' } }"
                style="width: 100%;height:500px; margin-top: 30px; margin-bottom: 0.75rem"
                @map-was-initialized="customizeMap"
              >
              </yandex-map>
            </b-field>
          </div>
          <b-field>
            <b-upload drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                      icon="upload"
                      size="is-large">
                    </b-icon>
                  </p>
                  <p>Добавьте обложку для ивента</p>
                  <p>Разрешением не менее 1344х250px</p>
                </div>
              </section>
            </b-upload>
          </b-field>
          <a class="button is-info is-pulled-right" @click="createEvent()">Создать ивент</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        event: {
          title: '',
          text: '',
          start_time: undefined,
          end_time: undefined,
          online: false,
          city: '',
          address: '',
          latitude: 0.0,
          longitude: 0.0,
          price: 0
        },
        cities: [],
        categories: [{id:0, name: 'Конференция'},{id:1, name: 'Митап'},{id:3, name: 'Вебинар'},{id:4, name: 'Презентация'}],
        editorOptions: {
          theme: 'snow',
          placeholder: 'Описание ивента'
        },
        userLat: 0.0,
        userLon: 0.0,
        start_day: undefined,
        start_time: undefined,
        end_day: undefined,
        end_time: undefined,
        responseErrors: []
      }
    },
    methods: {
      setStartMinTime() {
        if(this.start_day) {
          if(this.moment(this.start_day).format('L') === this.moment().format('L')) {
            return new Date();
          }
        }
      },
      buildStartTime() {
        if(this.start_day && this.start_time) {
          let hours = this.start_time.getHours();
          let minutes = this.start_time.getMinutes();

          this.event.start_time = this.moment(this.start_day)
            .startOf('day')
            .set('hour', hours)
            .set('minutes', minutes)
            .format();
        }
      },
      buildEndTime() {
        if(this.end_day && this.end_time) {
          let hours = this.end_time.getHours();
          let minutes = this.end_time.getMinutes();

          this.event.end_time = this.moment(this.end_day)
            .startOf('day')
            .set('hour', hours)
            .set('minutes', minutes)
            .format();
        }
      },
      minDate() {
        return this.moment().subtract(1, 'days').toDate();
      },
      days() {
        return this.moment.weekdaysShort().map(e => {
          return this.$_.capitalize(e);
        });
      },
      months() {
        return this.moment.months().map(e => {
          return this.$_.capitalize(e);
        });
      },
      dateFormat(date) {
        return this.moment(date).format('L');
      },
      now() {
        return new Date();
      },
      tomorrow() {
        return this.moment().add(1, 'days').toDate();
      },
      dayLater() {
        return this.moment().add(2, 'days').toDate();
      },
      customizeMap(map) {
        let self = this;

        // get user's location
        ymaps.geolocation.get({
          provider: 'yandex',
        }).then(function(result) {
          self.userLat = result.geoObjects.position[0];
          self.userLon = result.geoObjects.position[1];
          map.setCenter([self.userLat, self.userLon]);
        });

        // yandex maps search
        let searchControl = map.controls.get('searchControl');
        searchControl.events.add('resultselect', function(e) {
          let geoObject = searchControl.getResultsArray()[searchControl.getSelectedIndex(e)];
          let coordinates = geoObject.geometry.getCoordinates();
          self.event.longitude = coordinates[0];
          self.event.latitude = coordinates[1];

          let addrComponents = geoObject.properties.get('responseMetaData.Address.Components');
          let city = addrComponents.find((el) => {
            return el.kind === 'locality';
          });
          self.event.city = city ? city.name : '';
          self.event.address = geoObject.properties.get('address').replace(/^[А-Я].[^\s]*\s/, '');
        });


        // todo: find position on click
        // find position on click
        // map.events.add('click', e => {
        //   var coords = e.get('coords');
        //
        //   if(self.eventPlacemark) {
        //     self.eventPlacemark.geometry.setCoordinates(coords);
        //   }
        //   // Если нет – создаем.
        //   else {
        //     self.eventPlacemark = self.createPlacemark(coords);
        //     map.geoObjects.add(self.eventPlacemark);
        //     // Слушаем событие окончания перетаскивания на метке.
        //   }
        //   //get address
        //   self.getAddress(coords);
        // })
      },

      // getAddress(coords) {
      //   let self = this;
      //
      //   self.eventPlacemark.properties.set('iconCaption', 'поиск...');
      //   new ymaps.geocode(coords).then(function(res) {
      //     var firstGeoObject = res.geoObjects.get(0);
      //     let addrComponents = firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.Address.Components');
      //     self.event.city = firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities()[0] : '';
      //     self.event.address = firstGeoObject.getAddressLine();//.replace(/^[А-Яа-я].[^,]*,\s/, '');
      //     self.eventPlacemark.properties.set({
      //       // Формируем строку с данными об объекте.
      //       iconCaption: [
      //         // Название населенного пункта или вышестоящее административно-территориальное образование.
      //         firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
      //         // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
      //         firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
      //       ].filter(Boolean).join(', '),
      //       // В качестве контента балуна задаем строку с адресом объекта.
      //       balloonContent: firstGeoObject.getAddressLine()
      //     });
      //   });
      // },
      //
      // createPlacemark(coords) {
      //   return new ymaps.Placemark(coords, {
      //     iconCaption: 'поиск...'
      //   }, {
      //     preset: 'islands#violetDotIconWithCaption',
      //     draggable: true
      //   });
      // }
      fetchCities() {
        this.$http.get('/events/cities')
          .then(response => {
            this.cities = response.data.data;
          })
          .catch(response => {
            this.responseErrors = (response.data.data.errors);
          });
      },
      createEvent() {
        let self = this;
        this.$http.post('/events/', this.event, { headers: this.authHeaders })
          .then(response => {
            console.log(response.data.data.id);
            let eventId = response.data.data.id;
            self.$router.push({ name: 'showEvent', params: { id: eventId }});
          })
          .catch(response => {
            this.responseErrors = (response.data.data.errors);
          });
      },
    },
    computed: {
      ...mapGetters(['authHeaders'])
    },
    watch: {
      start_day() {
        this.buildStartTime();
      },
      start_time() {
        this.buildStartTime();
      },
      end_day() {
        this.buildEndTime();
      },
      end_time() {
        this.buildEndTime();
      }
    },
    created() {
      this.fetchCities();
    }
  }
</script>

<style lang="scss" scoped>
  .events {
    margin-top: 20px;
  }

  .field {
    flex-shrink: 1 !important;
  }
</style>

<style lang="scss">
  .ymap-body {
    width: 100%;
    height: 500px;
  }

  .upload-draggable {
    display: block !important;
  }
</style>
